import bcrypt from 'bcrypt'; 
import User from "../models/User.js";

export const register = async (req, res) => {
    const { email, firstName, lastName, password, dateOfBirth, country } =
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
        });
        res.send({verdict : "created"});
    } catch (error) {
        res.send({verdict : "error"});
    }
};
