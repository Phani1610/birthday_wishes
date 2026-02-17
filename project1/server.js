require("dotenv").config({ path: __dirname + "/db.env" });

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

// MongoDB Connection using environment variable
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    phone: String
});
const User = mongoose.model("User", userSchema);

// Signup
app.post("/signup", async (req,res)=>{
    const {name, phone} = req.body;

    if(!name || !phone)
        return res.json({message:"Please enter all fields"});

    const existing = await User.findOne({phone});
    if(existing)
        return res.json({message:"User already exists"});

    const newUser = new User({name, phone});
    await newUser.save();

    res.json({message:"Signup successful", name});
});

// Login
app.post("/login", async (req,res)=>{
    const {phone} = req.body;

    if(!phone)
        return res.json({message:"Enter phone number"});

    const user = await User.findOne({phone});
    if(!user)
        return res.json({message:"User not found"});

    res.json({message:"Login successful", name:user.name});
});

// Protect app route
app.get("/app", (req,res)=>{
    res.sendFile(path.join(__dirname,"public/app.html"));
});

app.listen(3000, ()=> console.log("Server running at http://localhost:3000"));