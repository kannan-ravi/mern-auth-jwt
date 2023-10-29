import express from "express";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/sign-up").post(authController.signUp);

export default router;
