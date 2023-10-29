import errorHandler from "../middleware/errorHandler.js";
import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";

const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 13);
  const newUser = new UserModel({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "USER HAS BEEN SUCCESSFULLY CREATED" });
  } catch (error) {
    // res.status(500).json(error.message);
    next(error);
  }
};

export default { signUp };
