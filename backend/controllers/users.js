import User from "../models/User.js";

export const register = async (req, res) => {
    const { email, firstName, secondName, password, dateOfBirth, country } =
        req.body;
    try {
        await User.create({
            email: email,
            firstName: firstName,
            secondName: secondName,
            password: password,
            dateOfBirth: dateOfBirth,
            country: country,
        });
        res.send({ status: "ok", data: "User Created" });
    } catch (error) {
        res.send({ status: "error", data: "error" });
    }
};
