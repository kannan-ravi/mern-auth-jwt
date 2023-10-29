import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "mern-auth",
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
  } catch (err) {
    console.log(err);
  }
}

export default connectDB;