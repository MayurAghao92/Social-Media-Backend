import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
    },
    password:String,

})

const userModel=mongoose.model("users",userSchema);

export default userModel;