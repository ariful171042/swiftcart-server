import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
//Importing Routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import orderRoute from "./routes/order.js";
import paymentRoute from "./routes/payment.js";
import dashboardRoute from "./routes/stats.js";
import { config } from "dotenv";
import morgan from "morgan";
import Stripe from "stripe";
config({
    path: "./.env",
});
const port = process.env.PORT || 4000;
const mongoURL = process.env.MONGO_DB_URI || "";
const stripeKey = process.env.STRIPE_KEY || "";
connectDB(mongoURL);
export const stripe = new Stripe(stripeKey);
export const myCache = new NodeCache();
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.get("/", (req, res) => {
    res.send("API Working with /api/v1");
});
//Useing Route
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/product", orderRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("uploads", express.static("uploads"));
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`server is working on http://localhost:${port}`);
});
