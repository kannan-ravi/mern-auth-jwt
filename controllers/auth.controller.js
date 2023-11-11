import errorHandler from "../middleware/errorHandler.js";
import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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

const singIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await UserModel.findOne({ email });
    if (!validUser)
      return next(errorHandler.customError(404, "User Not Found"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
      return next(errorHandler.customError(401, "Wrong Credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expireDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    res
      .cookie("token", token, { httpOnly: true, expires: expireDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

const googleAuth = async (req, res, next) => {
  try {
    const valideUser = await UserModel.findOne({ email: req.body.email });
    if (valideUser) {
      const token = jwt.sign({ id: valideUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = valideUser._doc;
      const expireDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      res
        .cookie("token", token, { httpOnly: true, expires: expireDate })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 13);
      const username =
        req.body.name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-8);
      const newUser = new UserModel({
        username: username,
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expireDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      res
        .cookie("token", token, { httpOnly: true, expires: expireDate })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

const signOut = (req, res) => {
  res.clearCookie("token").status(200).json("SignOut Success");
};

export default { signUp, singIn, googleAuth, signOut };
