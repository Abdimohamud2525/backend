import User from "../models/user.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { JWR_SECRET } from "../config/config.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() }, // Assuming you meant 'username' instead of 'useraname'
      ],
    });

    if (userExists) {
      if (userExists.email === email.toLowerCase()) {
        return res
          .status(400)
          .send({ status: false, message: "email already exists" });
      } else if (userExists.username === username.toLowerCase()) {
        return res
          .status(400)
          .send({ status: false, message: "Username already exists" });
      }
    } else {
      console.log(
        "No user found with this email or username. You can proceed."
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await user.save();

    res.status(200).send({
      status: true,
      massage: { username: user.username, email: user.email },
    });
  } catch (error) {
    console.log("eror at user registertion", error);
    res.status(500).send({ status: false, massage: "unknown error" });
  }
};

export const LoginUser = async (req, res) => {
  // validation user
  // secured
  // jwt token

  try {
    const { username, password } = req.body;

    // checking from database
    const isExists = await User.findOne({ username: username.toLowerCase() });

    if (!isExists) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid username or password" });
    }

    const validPassword = await bcrypt.compare(password, isExists.password);

    if (!validPassword) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid username or password" });
    }

    // jwt
    const token = Jwt.sign({ _id: isExists._id }, JWR_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.send({
      _id: isExists._id,
      username: isExists.username,
      email: isExists.email,
    });
  } catch (err) {
    console.log("erro at login", err);
  }
};
