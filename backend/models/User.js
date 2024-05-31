import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    dateOfBirth: String,
    country: String , 
    phoneNumber: String,
    identityCard: String,
    drivingLicense: String,
    carRegistration: String,
    role: { type: String, enum: ["driver", "rider"], required: true },
    rides: { type: Array, default: [] }
});

const User = mongoose.model("User", userSchema);

export default User;