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

const JWT_Secret = process.env.JWT_SECRET

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
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

app.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body)

    if (!user) return res.json({
      success: false,
      message: "Internal Server Error, try again later"
    })

    const token = jwt.sign({
      _id: user.id,
      email: user.email
    }, JWT_Secret, { expiresIn: '1d' })

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    })

    return res.status(200).json({
      success: true,
      message: "Sign IN Successful"
    })

  } catch (error) {
    if (error.code === 11000) {
      return res.json({
        success: false,
        message: "User Already Exists, Please Sign In"
      })
    }

    if (error.name == "ValidationError") {
      return res.json({
        success: false,
        message: "Please Enter All input in desired format"
      })
    }

    console.error("Error realted to cretion of user")
    return res.json({
      success: false,
      message: "Internal Server Error, try again later"
    })
  }

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

    const token = jwt.sign({
      _id: user._id,
      email: user.email
    }, JWT_Secret, { expiresIn: '1d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
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

app.get('/check-auth', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ loggedIN: false });

  try {
    const user = jwt.verify(token, JWT_Secret);
    res.json({
      loggedIN: true,
      email: user.email
    })
  } catch (error) {
    console.error("Login Verification Error- ", error)
    res.json({
      loggedIN: false
    })
  }
})

app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({
    message: "Logged Out Sucessfully"
  })
})

app.post('/set-summary', async (req, res) => {
  console.log("Summary Data recieved from frontend");
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ sucess: false, message: "Unauthorized" });

  try {
    const decode = jwt.verify(token, JWT_Secret);
    const user = await User.findById(decode._id);

    if (!user) res.status(401).json({ sucess: false, message: "No User Found" });

    const { generatedTitle, insight, tags, site } = req.body;
    user.summaries.push({
      generatedTitle,
      insight,
      tags,
      site
    });

    await user.save();
    return res.status(200).json({
      sucess: true,
      message: "Sucessfully Summarized the Article to the Account of the User"
    });

  } catch (error) {
    console.error("Error making summaries with backend", error);
    res.status(500).json({
      sucess: false,
      message: "Internal Server Error for Summaries"
    })
  }
})

app.get('/my-profile', async (req, res) => {
  const token = req.cookies.token;

  if (!token) res.status(401).json({
    sucess: false,
    message: "Not Logged IN"
  })

  try {
    const decode = jwt.verify(token, JWT_Secret);
    const user = await User.findById(decode._id)

    if (!user) res.status(401).json({
      success: false,
      message: "No User Found"
    })

    const profileData = {
      name: user.username,
      totalItems: user.summaries.length,
      joinedAt: user.createdAt,
      summarizedContent: user.summaries.map(({ generatedTitle, insight, tags, site }) => ({
        generatedTitle,
        insight,
        tags,
        site
      }))
    };
    res.status(200).json({
      success: true,
      data: profileData
    })

  } catch (error) {
    console.error("Error getting the data of the user", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }


})

app.get('/search-users', async (req, res) => {
  const { q } = req.query;

  if (!q) return res.status(400).json({
    success: false,
    message: "Query is Invalid"
  })

  try {
    const users = await User.find({
      username: { $regex: q, $options: "i" }
    }).select("username summaries")

    const result = users.map((user) => ({
      id: user._id,
      name: user.username,
      type: [...new Set(user.summaries.map(s => s.site))]
    }));

    res.status(200).json({
      success: true,
      users: result
    })

  } catch (error) {
    console.error("Error searching users", error);
    res.status(500).json({
      success: false,
      message: "Internal Search Server Error"
    });
  }
})

app.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) res.status(401).json({
      sucess: false,
      message: "User not found"
    });

    const profileData = {
      name: user.username,
      totalItems: user.summaries.length,
      joinedAt: user.createdAt,
      summarizedContent: user.summaries.map(({ generatedTitle, insight, tags, site }) => ({
        generatedTitle,
        insight,
        tags,
        site
      }))
    };

    res.status(200).json({
      success: true,
      user: profileData
    })
  } catch (error) {
    console.error("Error related to getting user", error)
    res.status(500).json({
      success:false,
      message:"Internal Server Error regaring user"
    })
  }
})
