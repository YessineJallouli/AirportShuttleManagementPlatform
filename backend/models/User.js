import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    airport : String,
    flightId : String,
    arrivalDay : String,
    arrivalTime: String,
    gateNumber: String,
    nbRiders: Number,
    destinationCoordinate : {
        latitude : String, 
        longitude : String, 
        address : String, 
        placeId : String
    },
    status : String,
});

const userSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    dateOfBirth: String,
    country: String, 
    phoneNumber: String,
    identityCard: String,
    drivingLicense: String,
    carRegistration: String,
    role: { type: String, enum: ["driver", "rider"], required: true },
    rides: { type: [rideSchema], default: [] }
});

const User = mongoose.model("User", userSchema);

export default User;
