import express from "express";

import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

//route - /api/v1/user/new
app.get("/new");

export default app;
