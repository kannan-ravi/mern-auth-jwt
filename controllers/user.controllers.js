import errorHandler from "../middleware/errorHandler.js";
import bcryptjs from "bcryptjs";
import UserModel from "../models/user.model.js";

const getUser = async (req, res) => {
  res.json({
    message: "Api is working",
  });
};

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler.customError(401, "You can update only your account!")
    );
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 13);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export default { getUser, updateUser };
