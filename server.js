import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import connectDB from "./config/dbConnection.js";
import corsOptions from "./config/corsOptions.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import errorHandler from "./middleware/errorHandler.js";
dotenv.config();

const __dirname = path.resolve();

const app = express();

app.use(express.static(path.join(__dirname, "../client")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

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
