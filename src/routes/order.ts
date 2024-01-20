import express from "express";

import { adminOnly } from "../middlewares/auth.js";
import { newOrder } from "../controller/order.js";

const app = express.Router();

//route - /api/order/new
app.post("/new", newOrder);

export default app;
