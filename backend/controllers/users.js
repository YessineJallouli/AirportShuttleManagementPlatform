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
    const { token, airport, flightId, arrivalDay, arrivalTime, gateNumber, nbRiders, destinationCoordinate } = req.body;

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
            destinationCoordinate
        };

        await User.findOneAndUpdate(
            { email: userEmail },
            { $push: { rides: ride } },
            { new: true }
        );

        res.send({ verdict: "created" });
    } catch (error) {
        console.error(error);
        res.send({ verdict: "error" });
    }
}
