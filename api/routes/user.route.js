import express from "express";
import userControllers from "../controllers/user.controllers.js";
import verifyToken from "../middleware/verifyUser.js";
const router = express.Router();

router.route("/").get(userControllers.getUser);
router.route("/update/:id").post(verifyToken, userControllers.updateUser);
router.route("/delete/:id").delete(verifyToken, userControllers.deleteUser);

export default router;
