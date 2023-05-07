import express from "express";
import {
  registerController,
  loginController,
  profileController,
  adminController,
  deleteUserController,
  allUsersController,
  addUserController,
  loginGoogleUserController,
} from "../Users/UsersControllers.js";
import { validateToken } from "../Users/JWT.js";
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.delete("/deleteUser/:id", deleteUserController);
router.get("/profile", validateToken, profileController);
router.get("/admin", validateToken, adminController);
router.get("/getAllUsers", allUsersController);
router.post("/addUser", addUserController);
router.post("/google-login", loginGoogleUserController);

export default router;
