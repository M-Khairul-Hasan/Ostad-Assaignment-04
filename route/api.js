import express from "express";
import * as UserController from "../app/controller/usersControllers.js";
import authMiddleware from "../app/middleware/authMiddleware.js";

const Router = express.Router();

Router.post("/UserRegistration", UserController.UserRegistration);
Router.post("/UserLogin", UserController.UserLogin);
Router.get("/ReadProfile", authMiddleware, UserController.ReadProfile);
Router.get("/ReadAllProfile", authMiddleware, UserController.ReadAllProfile);
Router.post("/UpdateProfile", authMiddleware, UserController.UpdateProfile);
Router.post("/UserDelete", authMiddleware, UserController.UserDelete);

export default Router;
