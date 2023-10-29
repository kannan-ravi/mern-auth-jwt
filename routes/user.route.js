import express from "express";
import userControllers from "../controllers/user.controllers.js";
const router = express.Router();

router.route("/").get(userControllers.getUser);

export default router;