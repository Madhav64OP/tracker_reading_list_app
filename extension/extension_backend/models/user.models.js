import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:[true,'Password is Required']
    }
},{
    timestamps:true
})

userSchema.pre("validate",async function(next){
    if(!this.isModified("password")) return next();

    try {
        this.password=await bcrypt.hash(this.password,10)
    next()
    } catch (error) {
        next(error);
    }
    
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
}

export const User = mongoose.model("User",userSchema)