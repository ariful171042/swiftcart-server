import mongoose from "mongoose";
import validator from "validator";

interface IUser extends Document {
  _id: string;
  name: string;
  photo: string;
  email: string;
  role: "admin" | "user";
  gender: "male" | "female";
  dob: Date;
  createdAt: Date;
  updatedAt: Date;

  //Virtual Attiribute
  age: number;
}

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "Place enter ID"],
    },
    name: {
      type: String,
      required: [true, "Plaese enter Name"],
    },
    email: {
      type: String,
      unique: [true, "Email already exist"],
      required: [true, "Plaese enter Email"],
      validate: validator.default.isEmail,
    },
    photo: {
      type: String,
      required: [true, "Plaese enter Photo"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Plase enter Gender"],
    },
    dob: {
      type: Date,

      required: [true, "Plase enter Date of Birth"],
    },
  },
  {
    timestamps: true,
  }
);

schema.virtual("age").get(function () {
  const today = new Date();
  const dob = this.dob;
  let age = today.getFullYear() - dob.getFullYear();

  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  )
    age--;

  return age;
});

export const User = mongoose.model<IUser>("User", schema);
