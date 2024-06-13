import bcrypt from 'bcrypt'; 
import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const JWT_SECRET = "07ddda787a944089bab608e1b82a6f429d7b70d8ee25eccbfbca0a0e30112324";

export const register = async (req, res) => {
    const { email, firstName, lastName, password, dateOfBirth, country, phoneNumber, identityCard, drivingLicense, carRegistration, role } = req.body;

    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
        return res.send({ verdict: "exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        await User.create({
            email,
            firstName,
            lastName,
            password: hashedPassword,
            dateOfBirth,
            country,
            phoneNumber,
            identityCard,
            drivingLicense,
            carRegistration,
            role
        });
        res.send({ verdict: "created" });
    } catch (error) {
        res.send({ verdict: "error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    const oldUser = await User.findOne({ email });

    if (!oldUser) {
        res.send({ verdict: "notExist" });
    } else {
        try {
            const isPasswordMatch = await bcrypt.compare(password, oldUser.password);
            if (isPasswordMatch) {
                const token = jwt.sign({ email: oldUser.email }, JWT_SECRET);
                res.send({ verdict: "logged", userRole: oldUser.role, token });
            } else {
                res.send({ verdict: "notMatch" });
            }
        } catch (error) {
            res.send({ verdict: "error" });
        }
    }
};

export const userData = async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        const userEmail = user.email;
        User.findOne({ email: userEmail }).then((data) => {
            res.send({ verdict: "success", data });
        });
    } catch (error) {
        res.send({ verdict: "error" });
    }
};

export const requestRide = async (req, res) => {
    const { token, airport, flightId, arrivalDay, arrivalTime, gateNumber, nbRiders, destinationCoordinate, status } = req.body;

    try {
        const user = jwt.verify(token, JWT_SECRET);
        const userEmail = user.email;

        const ride = {
            _id: new mongoose.Types.ObjectId(),
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
};

const addRideForAllDrivers = async (rideDetails) => {
    try {
        const allDrivers = await User.find({ role: 'driver' });
        for (const driver of allDrivers) {
            await User.findOneAndUpdate(
                { _id: driver._id },
                { $push: { rides: rideDetails } },
                { new: true }
            );
        }
    } catch (error) {
        console.error('Error adding ride for all drivers:', error);
    }
};

export const confirmRide = async (req, res) => {
    const { token, flightId } = req.body;

    try {
        // Verify user token to get the driver's email
        const user = jwt.verify(token, JWT_SECRET);
        const userEmail = user.email;

        // Find the ride in the driver's rides and update its status to 'confirmed'
        const updatedDriver = await User.findOneAndUpdate(
            { email: userEmail, 'rides.flightId': flightId },
            { $set: { 'rides.$.status': 'confirmed' } },
            { new: true }
        );

        if (!updatedDriver) {
            return res.send({ verdict: "notFound" });
        }

        // Find the rider who requested the ride and update its status to 'confirmed'
        const updatedRider = await User.findOneAndUpdate(
            { 'rides.flightId': flightId, role: 'rider' },
            { $set: { 'rides.$.status': 'confirmed' } },
            { new: true }
        );

        if (!updatedRider) {
            return res.send({ verdict: "riderNotFound" });
        }

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
};

export const cancelRide = async (req, res) => {
    const { token, flightId } = req.body;

    try {
        const user = jwt.verify(token, JWT_SECRET);
        const userEmail = user.email;

        await User.updateOne(
            { email: userEmail, 'rides.flightId': flightId },
            { $pull: { rides: { flightId: flightId } } }
        );

        res.send({ verdict: "cancelled" });
    } catch (error) {
        console.error('Error cancelling ride:', error);
        res.send({ verdict: "error" });
    }
};
