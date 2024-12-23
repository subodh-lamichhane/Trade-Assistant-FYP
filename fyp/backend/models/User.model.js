import mongoose from "mongoose";

const userData = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
    },
    emailAddress:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },

})
const User = mongoose.model("user", userData)
export default User