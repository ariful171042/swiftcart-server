import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { getBarCharts, getDashboardStats, getLineCharts, getPieCharts, } from "../controller/stats.js";
const app = express.Router();
//route - /api/dashboard/stats
app.get("/stats", adminOnly, getDashboardStats);
//route - /api/dashboard/pie
app.get("/pie", adminOnly, getPieCharts);
//route - /api/dashboard/bar
app.get("/bar", adminOnly, getBarCharts);
//route - /api/dashboard/line
app.get("/line", adminOnly, getLineCharts);
export default app;
