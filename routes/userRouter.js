import express from "express";
import {
  registration,
  registrationProcess,
  login,
  loginProcess,
  showAllUsers,
} from "../controller/userController.js";

const router = express.Router();

// Routes
router.get("/", registration); // Registration page
router.post("/register", registrationProcess); // Registration process
router.get("/login", login); // Login page
router.post("/login", loginProcess); // Login process
router.get("/users", showAllUsers); // Show all users

export default router;
