import Express from "express";
import {
  deleteProduct,
  getAllProduct,
  saveProduct,
  updateProduct,
} from "../Controller/ProductController.js";
import { verifyUser } from "../util/VerifyToken.js";
const Router = Express.Router();

Router.post("/create", verifyUser, saveProduct);
Router.put("/update/:id", verifyUser, updateProduct);
Router.delete("/delete/:id", verifyUser, deleteProduct);
Router.get("/", verifyUser, getAllProduct);

export default Router;
