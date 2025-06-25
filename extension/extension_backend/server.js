import dotenv from "dotenv"

import express from "express"
import mongoose from "mongoose"
import connectDB from "./db/index.js"
import cors from "cors"
import { User } from "./models/user.models.js"

dotenv.config({
  path: "./.env"
})

const app = express()

app.use(cors({
  origin: process.env.CORS_ORIGIN
}))

app.use(express.json());

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

    return res.json({
      sucess: true,
      message: "Welcome !!"
    })

  } catch (error) {
    console.error("Internal Server Error in Login", error);
    res.status(500).json({ sucess: false, message: "Internal Server Error" })
  }
})
