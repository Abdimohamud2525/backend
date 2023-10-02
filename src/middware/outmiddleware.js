import { JWR_SECRET } from "../config/config.js";
import Jwt from "jsonwebtoken";
export const authenticate = (req, res, next) => {
  const token = req.cookies.token;

  console.log("token", token);
  if (!token)
    return res.status(403).send({
      status: false,
      message: "access denied, no Token Provided please login first",
    });

  try {
    const decoded = Jwt.verify(token, JWR_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("jwt verication error", error);
  }
};
