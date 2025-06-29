import dotenv from "dotenv"

import express from "express"
import mongoose from "mongoose"
import connectDB from "./db/index.js"
import cors from "cors"
import { User } from "./models/user.models.js"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"

dotenv.config({
  path: "./.env"
})

const app = express()

const JWT_Secret=process.env.JWT_SECRET

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials:true
}))

app.use(express.json());
app.use(cookieParser());

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR !! ", error);
      throw error
    })
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at PORT : ${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.error("MongoDB Connection Failed !!", err);
  })

app.post('/register', (req, res) => {
  User.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email })

    if (!user) {
      return res.json({
        sucess: false,
        message: "No User Found, Please SignUp"
      })
    }

    const isPassCorrect = await user.isPasswordCorrect(password)
    if (!isPassCorrect) {
      return res.json({
        sucess: false,
        message: "Incorrect Password !!"
      })
    }

    const token=jwt.sign({
      _id:user._id,
      email:user.email
    },JWT_Secret,{expiresIn:'1d'});

    res.cookie('token',token,{
      httpOnly:true,
      secure:process.env.NODE_ENV === "production",
      sameSite:'lax',
      maxAge:24 * 60 * 60 * 1000 // 1 day
    })

    return res.json({
      sucess: true,
      message: "Login Successful !!"
    })

  } catch (error) {
    console.error("Internal Server Error in Login", error);
    res.status(500).json({ sucess: false, message: "Internal Server Error" })
  }
})

app.get('/check-auth',(req,res)=>{
  const token=req.cookies.token;
  if(!token) return res.json({loggedIN:false});

  try {
    const user=jwt.verify(token,JWT_Secret);
    res.json({
      loggedIN:true,
      email:user.email
    })
  } catch (error) {
    console.error("Login Verification Error- ",error)
    res.json({
      loggedIN:false
    })
  }
})

app.post('/logout',(req,res)=>{
  res.clearCookie('token');
  res.json({
    message:"Logged Out Sucessfully"
  })
})

app.post('/set-summary',async (req,res)=>{
  const token=req.cookies.token;
  if(!token) return res.status(401).json({sucess:false,message:"Unauthorized"});
  
  try {
    const decode=jwt.verify(token,JWT_Secret);
    const user=await User.findById(decode._id);
    
    if(!user) res.send(401).json({sucess:false,message:"No User Found"});

    const {generatedTitle,insight,tags,site}=req.body;
    user.summaries.push({
      generatedTitle,
      insight,
      tags,
      site
    });

    await user.save();

  } catch (error) {
    console.error("Error making summaries with backend",error);
    res.status(500).json({
      sucess:false,
      message:"Internal Server Error for Summaries"
    })
  }

})