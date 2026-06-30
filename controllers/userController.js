import { User } from "../models/usersModel.js";
import bcrypt from "bcryptjs";

export const showUsers = async (req, res) => {
    try {
        const users = await User.find().sort({"username": 1});
        return res.render("user/index", {
            layout: "layouts/main-layout",
            title: "Users",
            users,
            success: req.flash("success"),
            errors: req.flash("errors")
        })
    } catch (err) {
        next(err);
    }
}

export const createUser = async (req, res, next) => {
    try {
        const { username, email, role, password } = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const insertUser = await User.insertOne({
            username,
            email,
            role,
            password: hashed
        });
        if (insertUser.insertedId < 1) return next(err);
        req.flash("success", "User created successfully");
        return res.redirect("/user")
    } catch (err) {
        next(err);
    }
}

// export const editUser = async (req, res, next) => {
//     const { username, email, role, password } = req.body;
//     const 
// }