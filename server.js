import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import connectDB from "./config/dbConnection.js";
import corsOptions from "./config/corsOptions.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connection.once("open", () => {
  console.log("Connected to Database");
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
});
