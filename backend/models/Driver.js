import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
    email : String,
    firstName : String,
    lastName : String,
    password: String,
    dateOfBirth : String,
    phoneNumber : String,
    identityCard : String,
    drivingLicense : String,
    carRegistration : String
});

const Driver = mongoose.model("drivers", driverSchema);

export default Driver;