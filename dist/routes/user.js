import express from "express";
import { deleteUser, getAllUsers, getUser, newUser, } from "../controller/user.js";
import { adminOnly } from "../middlewares/auth.js";
const app = express.Router();
//route - /api/v1/user/new
app.post("/new", newUser);
// get all users
app.get("/all", adminOnly, getAllUsers);
// get a users
app.get("/:id", getUser);
app.delete("/:id", deleteUser);
export default app;
