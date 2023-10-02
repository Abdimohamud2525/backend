import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String, // Muuta "string" -> "String"
      required: true, // Korjaa "require" -> "required"
      unique: true,
    },
    email: {
      type: String, // Muuta "string" -> "String"
      required: true, // Korjaa "require" -> "required"
      unique: true,
    },
    password: {
      type: String, // Muuta "string" -> "String"
      required: true,
    },
  },
  {
    timestamps: true, // Korjaa "timestamp" -> "timestamps" ja siirrä se objektin sisälle
  }
);

const User = mongoose.model("User", userSchema);
export default User;
