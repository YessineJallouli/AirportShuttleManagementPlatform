import Driver from "../models/Driver.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    const { email, firstName, lastName, password, dateOfBirth, phoneNumber, identityCard, drivingLicense, carRegistration } =
        req.body;

    const oldDriver = await Driver.findOne({ email : email });
    if (oldDriver) {
        return res.send({verdict : "exist"});
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await Driver.create({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword,
            dateOfBirth: dateOfBirth,
            phoneNumber : phoneNumber,
            identityCard : identityCard,
            drivingLicense : drivingLicense,
            carRegistration : carRegistration,
        });
        res.send({verdict : "created"});
    } catch (error) {
        res.send({verdict : "error"});
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;

    const oldDriver = await Driver.findOne({ email: email });

    if(!oldDriver){
        res.send({verdict : "notExist"})
    }else{
        try {
            const isPasswordMatch = await bcrypt.compare(password, oldDriver.password);
            if (isPasswordMatch) {
                res.send({ verdict: "logged" });
            } else {
                res.send({ verdict: "notMatch" });
            }
        } catch (error) {
            res.send({ verdict: "error" });
        }
    }
};