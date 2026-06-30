import express from "express";
import { createUser, showUsers } from "../controllers/userController.js";
export const usersRouter = express.Router();
import { verifyAuthentication } from "../middlewares/authentiaction.js";
import { requiredRole } from "../middlewares/authorization.js";
import { User } from "../models/usersModel.js";

/* GET users listing. */
usersRouter.get("/", showUsers);

usersRouter.post("/", createUser);

usersRouter.delete("/:id", async (req, res) => {
    const deletedUser = await User.deleteOne({ _id: req.params.id });
    if (deletedUser.deletedCount < 1) {
        req.flash("error", "Failed deleting user");
        return res.redirect("/user");
    }

    req.flash("success", "User has been deleted successfully");
    return res.redirect("/user");
});

