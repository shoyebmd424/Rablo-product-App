import Express from "express";
import dotenv from "dotenv";
import cors from "cors";
import DBConnect from "./DBConnect.js";
import User from "./Router/User.js";
import Auth from "./Router/Auth.js";
import Product from "./Router/Product.js";
import path from "path";
dotenv.config();
const App = Express();
const __dirname = path.resolve();
const PORT = 8080 || process.env.PORT;

// middlewares
App.use(Express.json());
App.use(cors());
App.use(Express.static(path.join(__dirname, "./client/build")));

// Routes
App.use("/user", User);
App.use("/auth", Auth);
App.use("/product", Product);

App.get("/", (req, res) => {
  res.send("Server is running");
});

//rest api
App.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
App.listen(PORT, (req, res) => {
  DBConnect();
  console.log("server is running on port" + PORT);
});
