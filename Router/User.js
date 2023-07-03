import express from "express";

const Router = express.Router();
Router.get("/user", (req, res) => {
  res.send("Router is working");
});
export default Router;
