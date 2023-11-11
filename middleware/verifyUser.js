import jwt from "jsonwebtoken";
import errorHandler from "./errorHandler.js";

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(errorHandler.customError(401, "You are not authenticated"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler.customError(401, "Access Denied"));

    req.user = user;
    next();
  });
};

export default verifyToken;
