import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

async function registerController(req, res) {
  const { username, password } = req.body;

  const isUserExist = await userModel.findOne({
    username,
  });
  if (isUserExist) {
    return res.status(409).json({
      message: "User Already exists",
    });
  }

  const newUser = await userModel.create({
    username,
    password:await bcrypt.hash(password,10),
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: newUser,
  });
}

async function loginController(req, res) {
  const { username, password } = req.body;

  const user = await userModel.findOne({
    username,
  });

  if (!user) {
    return res.status(401).json({
      message: "User not found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password,user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  const token= jwt.sign({id:user._id},process.env.JWT_SECRET);
    res.cookie("token",token);
    res.status(200).json({ 
        message: "Login Successful",
        user:{
            id:user._id,
            username:user.username,
        },
     })
}

export  { registerController, loginController };
