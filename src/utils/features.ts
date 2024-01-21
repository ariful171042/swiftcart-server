import mongoose from "mongoose";
import { OrderItemType, RevalidateCachesProps } from "../types/types.js";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";

export const connectDB = (uri: string) => {
  mongoose
    .connect(uri)
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
  userId,
  orderId,
  productId,
}: RevalidateCachesProps) => {
  if (product) {
    const productKeys: string[] = [
      "latest-products",
      "categories",
      "all-products",
    ];

    if (typeof productId === "string") productKeys.push(`product-${productId}`);

    if (typeof productId === "object")
      productId.forEach((i) => productKeys.push(`product-${i}`));

    myCache.del(productKeys);
  }
  if (order) {
    const ordersKeys: string[] = [
      "all-orders",
      `my-orders-${userId}`,
      `order-${orderId}`,
    ];

    myCache.del(ordersKeys);
  }
  if (admin) {
  }
};

export const reduceStock = async (orderItems: OrderItemType[]) => {
  for (let i = 0; i < orderItems.length; i++) {
    const order = orderItems[i];
    const product = await Product.findById(order.productId);
    if (!product) throw new Error("Product not Found");

    product.stock -= order.quantity;

    await product.save();
  }
};

export const calculatePercentage = (thisMonth: number, lastMonth: number) => {
  if (lastMonth === 0) return thisMonth * 100;
  const percent = ((thisMonth - lastMonth) / lastMonth) * 100;
  return Number(percent.toFixed(0));
};
