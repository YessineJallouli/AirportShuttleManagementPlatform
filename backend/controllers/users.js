import bcrypt from 'bcrypt'; 
import User from "../models/User.js";
import jwt from 'jsonwebtoken';

const JWT_SECRET = "07ddda787a944089bab608e1b82a6f429d7b70d8ee25eccbfbca0a0e30112324";

export const register = async (req, res) => {
    const { email, firstName, lastName, password, dateOfBirth, country,  phoneNumber, identityCard, drivingLicense, carRegistration, role } =
        req.body;

    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
        return res.send({verdict : "exist"});
    }

    //hash the password 
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
            await User.create({
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: hashedPassword,
                dateOfBirth: dateOfBirth,
                country: country,
                phoneNumber : phoneNumber,
                identityCard : identityCard,
                drivingLicense : drivingLicense,
                carRegistration : carRegistration,
                role : role
            });
        res.send({verdict : "created"});
    } catch (error) {
        res.send({verdict : "error"});
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;

    const oldUser = await User.findOne({ email: email });

    if(!oldUser){
        res.send({verdict : "notExist"})
    }else{
        try {
            const isPasswordMatch = await bcrypt.compare(password, oldUser.password);
            if (isPasswordMatch) {
                const token = jwt.sign({email:oldUser.email}, JWT_SECRET);
                res.send({ verdict: "logged", userRole: oldUser.role, token : token}); 
            } else {
                res.send({ verdict: "notMatch"});
            }
        } catch (error) {
            res.send({ verdict: "error" });
        }
    }
}

export const userData = async(req, res) => {
    const {token} = req.body;
    try{
        const user = jwt.verify(token,JWT_SECRET);
        const userEmail = user.email;
        User.findOne({email : userEmail}).then((data) => {
            return res.send({verdict : "success", data : data});
        });
    }catch(error){

    }
}

export const requestRide = async (req, res) => {
    const { token, airport, flightId, arrivalDay, arrivalTime, gateNumber, nbRiders, destinationCoordinate, status } = req.body;

    try {
        const user = jwt.verify(token, JWT_SECRET);
        const userEmail = user.email;

        const ride = {
            airport,
            flightId,
            arrivalDay,
            arrivalTime,
            gateNumber,
            nbRiders,
            destinationCoordinate,
            status,
        };

        await User.findOneAndUpdate(
            { email: userEmail },
            { $push: { rides: ride } },
            { new: true }
        );

        await addRideForAllDrivers(ride);

        res.send({ verdict: "created" });
    } catch (error) {
        console.error(error);
        res.send({ verdict: "error" });
    }
}

const addRideForAllDrivers = async (rideDetails) => {
    try {
      // Query your database to find all drivers
      const allDrivers = await User.find({ role: 'driver' });
  
      // Add the ride for each driver
      for (const driver of allDrivers) {
        // Add the ride to the driver's data
        await User.findOneAndUpdate(
          { _id: driver._id },
          { $push: { rides: rideDetails } },
          { new: true }
        );
      }
    } catch (error) {
      console.error('Error adding ride for all drivers:', error);
    }
}

export const confirmRide = async (req, res) => {
    const { token, flightId } = req.body;

    try {
        // Verify user token to get the user's email
        const user = jwt.verify(token, JWT_SECRET);
        const userEmail = user.email;

        // Update the ride status to "confirmed" for the specific user
        await User.findOneAndUpdate(
            { email: userEmail, 'rides.flightId': flightId },
            { $set: { 'rides.$.status': 'confirmed' } }
        );

        // Remove the ride from the pending list of all other drivers
        await User.updateMany(
            { 'rides.flightId': flightId, 'rides.status': 'pending', email: { $ne: userEmail } },
            { $pull: { rides: { flightId: flightId } } }
        );

        res.send({ verdict: "confirmed" });
    } catch (error) {
        console.error('Error confirming ride:', error);
        res.send({ verdict: "error" });
    }
}

// Controller function to cancel ride for the driver
export const cancelRide = async (req, res) => {
    const { token, flightId } = req.body;

    try {
        // Verify user token to get the user's email
        const user = jwt.verify(token, JWT_SECRET);
        const userEmail = user.email;

        // Delete the ride from the user's pending rides
        await User.updateOne(
            { email: userEmail, 'rides.flightId': flightId },
            { $pull: { rides: { flightId: flightId } } }
        );

        res.send({ verdict: "cancelled" });
    } catch (error) {
        console.error('Error cancelling ride:', error);
        res.send({ verdict: "error" });
    }
}
