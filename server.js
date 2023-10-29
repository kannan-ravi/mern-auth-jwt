import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors';
import connectDB from "./config/dbConnection.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

mongoose.connection.once("open", () => {
  console.log("Connected to Database");
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
});
