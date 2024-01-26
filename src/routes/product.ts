import express from "express";

import { adminOnly } from "../middlewares/auth.js";
import {
  deleteProduct,
  getAdminProducts,
  getAllProduct,
  getCategoryPRoducts,
  getLatestPRoducts,
  getProduct,
  newProduct,
  updateProduct,
} from "../controller/product.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

//create product
app.post("/new", singleUpload, newProduct);

//get all Product
app.get("/all", getAllProduct);

//get latest Product
app.get("/search", getLatestPRoducts);

//get latest Product
app.get("/latest", getLatestPRoducts);

//get product category
app.get("/category", getCategoryPRoducts);

//get latest Product
app.get("/admin/products", adminOnly, getAdminProducts);

app.put("/update/:id", adminOnly, updateProduct);

//Delete Product
app.route("/:id").get(getProduct).delete(adminOnly, deleteProduct);

export default app;
