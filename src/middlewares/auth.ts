import { User } from "../models/user.js";
import ErrorHanler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";

//Middleware to make sure only admin is allowed
export const adminOnly = TryCatch(async (req, res, next) => {
  const { id } = req.query;

  if (!id) return next(new ErrorHanler("Login Now", 401));

  const user = await User.findById(id);

  if (!user) return next(new ErrorHanler("Fake Id", 401));

  if (user.role !== "admin")
    return next(new ErrorHanler("Only admin Accessable", 401));

  next();
});
