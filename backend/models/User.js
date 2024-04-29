import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : String,
    firstName : String,
    lastName : String,
    password: String,
    dateOfBirth : String,
    country : String
});

const User = mongoose.model("users", userSchema);

export default User;