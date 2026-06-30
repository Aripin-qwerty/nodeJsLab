import express from "express";
import { body } from "express-validator";
import { User } from "../models/usersModel.js";

import {
  loginHandler,
  logoutHandler,
  registerHandler,
  verifyRegister,
} from "../controllers/authController.js";

export const authRouter = express.Router();
const generalValidation = (field) => body(field).notEmpty().trim().escape();

authRouter.get("/register",
  (req, res) => {
  res.render("register", {
    layout: "layouts/auth",
    title: "Register",
    error: req.flash("error"),
    success: req.flash("success"),
  });
});

authRouter.post(
  "/register",
  generalValidation("username").withMessage("Username is required"),
  body("email").custom(async (email) => {
    const emailMatch = await User.findOne({ email });
    if (emailMatch) {
      throw new Error("Email already in use");
    }
    return true;
  }),
  generalValidation("email").withMessage("Email is required").isEmail().withMessage("Email isn't valid format"),
  body("password")  
    .notEmpty()
    .withMessage("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
    )
    .withMessage(
      "Password must contains min. 8 characters lowercase, uppercase, number, and at least one symbol (!@#$%^&*()_+).",
    ),
  registerHandler,
);

authRouter.get("/verify", verifyRegister);

authRouter.get("/login", (req, res) => {
  res.render("login", {
    layout: "layouts/auth",
    title: "Login",
    error: req.flash("error"),
  });
});

authRouter.post("/login",
  generalValidation("username").withMessage("username is required"),
  generalValidation("password").withMessage("Password is required"),
  loginHandler);

authRouter.get("/logout", logoutHandler);
