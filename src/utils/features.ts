import mongoose from "mongoose";
import { RevalidateCachesProps } from "../types/types.js";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";

export const connectDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/Swiftcart")
    .then((connection) => {
      console.log(`DB connected to ${connection.connection.host}`);

      // Handling events
      connection.connection.on("error", (error) => {
        console.error(`MongoDB connection error: ${error}`);
      });

      connection.connection.on("disconnected", () => {
        console.log("MongoDB disconnected");
      });
    })
    .catch((error) => {
      console.error(`Error connecting to MongoDB: ${error}`);
    });
};

export const revalidateCache = async ({
  product,
  order,
  admin,
}: RevalidateCachesProps) => {
  if (product) {
    const productKeys: string[] = [
      "latest-products",
      "categories",
      "all-products",
    ];

    const products = await Product.find({}).select("_id");

    products.forEach((i) => {
      productKeys.push(`product-${i._id}`);
    });

    myCache.del(productKeys);
  }
  if (order) {
  }
  if (admin) {
  }
};
