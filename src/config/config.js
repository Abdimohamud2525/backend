import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT;
export const dbURL = process.env.DATABASE_URL;
export const JWR_SECRET = process.env.jwt_secret_key;
