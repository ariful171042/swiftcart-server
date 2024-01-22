import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { allCoupons, applyDiscount, createPaymentIntent, deleteCoupon, newCoupon, } from "../controller/payment.js";
const app = express.Router();
//route - /api/payment/create
app.post("/create", createPaymentIntent);
app.get("/discount", applyDiscount);
//route - /api/payment/coupon/new
app.post("/coupon/new", adminOnly, newCoupon);
app.get("/coupon/all", adminOnly, allCoupons);
app.delete("/coupon/:id", adminOnly, deleteCoupon);
export default app;
