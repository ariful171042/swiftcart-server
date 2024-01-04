import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/Swiftcart")
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
