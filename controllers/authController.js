import { User } from "../models/usersModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { validationResult } from "express-validator";

import { sendMail } from "../services/authService.js";

export const registerHandler = async (req, res, next) => {
  try {
    const errorValidate = validationResult(req);
    if (errorValidate.errors.length) {
      req.flash("error", errorValidate.errors);
      return res.redirect("/auth/register");
    }

    const { username, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    const rawToken = crypto.randomBytes(32).toString("hex");
    const token = crypto.createHash("sha256").update(rawToken).digest("hex");
    const insertUser = await User.insertOne({
      username,
      email,
      password: hashed,
      verified: false,
      verificationToken: token,
      verificationExpires: Date.now() + 1000 * 60 * 60,
    });
    if (insertUser.insertedId < 1) return next(err);

    await sendMail(`http://127.0.0.1:3000/auth/verify?token=${token}`);
    req.flash(
      "success",
      "Check your email, the verification link has been sent!",
    );
    return res.redirect('/auth/register');
  } catch (err) {
    return next(err);
  }
};

export const verifyRegister = async (req, res, next) => {
  const token = req.query.token;
  const userMatch = await User.findOne({
    verificationToken: token,
    verificationExpires: { $gt: Date.now() },
  });

  if (userMatch === null) return next(err);

  userMatch.verified = true;
  userMatch.verificationToken = undefined;
  userMatch.verificationExpires = undefined;

  await userMatch.save();

  req.session.regenerate((err) => {
    if (err) return next(err);

    req.session.user = {
      id: userMatch._id,
      username: userMatch.username,
      role: userMatch.role
    };
    res.redirect("/");
  });
};

export const loginHandler = async (req, res, next) => {
  try {
    const validateError = validationResult(req);
    if (validateError.errors.length) {
      req.flash("error", validateError.errors);
      return res.redirect("/auth/login");
    }

    const { username, password } = req.body;
    const userMatch = await User.findOne({ username });

    if (userMatch === null) {
      req.flash("error", "Invalid credentials");
      return res.redirect("/auth/login");
    }

    const validCredentials = await bcrypt.compare(password, userMatch.password);

    if (!validCredentials) {
      req.flash("error", "Invalid credentials");
      return res.redirect("/auth/login");
    }

    req.session.regenerate((err) => {
      if (err) return next(err);

      req.session.user = {
        id: userMatch._id, 
        username: userMatch.username,
        role: userMatch.role
      };
      return res.redirect("/");
    });
  } catch (err) {
    next(err);
  }
};

export const logoutHandler = (req, res) => {
  req.session.destroy(err => {
    res.clearCookie("sid");
    res.redirect("/auth/login");
  })
}
