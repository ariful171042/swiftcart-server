import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
//Importing Routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
const port = 4000;
connectDB();
export const myCache = new NodeCache();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("API Working with /api/v1");
});
//Useing Route
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("uploads", express.static("uploads"));
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`server is working on http://localhost:${port}`);
});
