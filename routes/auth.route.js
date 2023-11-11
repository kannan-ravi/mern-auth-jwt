import express from "express";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/sign-up").post(authController.signUp);
router.route("/sign-in").post(authController.singIn);
router.route("/google").post(authController.googleAuth);
router.route("/signout").get(authController.signOut);
export default router;
