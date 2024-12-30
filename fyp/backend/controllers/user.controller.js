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


export const loginUser = async(req, res) => {
    try{
        const {emailAddress, Password} = req.body;
        const {password} = await bcrypt.hash(Password,10)

        const User = await User.findOne({username:username})
        If(!User){
            res.json({message:"Password error"})
        }

        else{
            const isValid = await bcrypt.compare(password, User.password)
            if(isValid === true){
                console.log(User.id)
                const token = createToken(User.id)
                res.json({message:"You are loggedin and token created",
                        token:token,
                        User:User.emailAddress
            )}
        }
            else{
                res.json({message:"Password error"})
            }
    }
}