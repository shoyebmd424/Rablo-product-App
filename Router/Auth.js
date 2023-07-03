import express from "express";
import {
  check,
  forgotpassword,
  login,
  register,
} from "../Controller/AuthController.js";
import { verifyUser } from "../util/VerifyToken.js";
const Router = express.Router();
Router.post("/signup", register);
Router.post("/signin", login);
Router.post("/forget", forgotpassword);
Router.get("/user-auth", verifyUser, (req, res) => {
  res.status(200).send({ ok: true });
});

export default Router;
