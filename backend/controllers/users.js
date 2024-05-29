import bcrypt from 'bcrypt'; 
import User from "../models/User.js";

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
                res.send({ verdict: "logged" });
            } else {
                res.send({ verdict: "notMatch" });
            }
        } catch (error) {
            res.send({ verdict: "error" });
        }
    }
}
