import User from "../models/User.model.js"
import bcrypt from "bcrypt"


export const addUser = async(req, res) => {
    try{
        const {fullName, PhoneNumber, emailAddress, Password } = req.body;
        const phoneNumber = parseInt(PhoneNumber)
        const password = await bcrypt.hash(Password,10)

        const addUser = new User({
            fullName, emailAddress , phoneNumber,  password
        })
        const insertUser = await addUser.save();
        console.log(`User created ${fullName}`)
        res.status(200).json(insertUser)

    }
    catch{
        console.log(Error)
    }
}