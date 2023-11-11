import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/dbConnection.js";
import corsOptions from "./config/corsOptions.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import errorHandler from "./middleware/errorHandler.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

// app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler.errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to Database");
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
});
