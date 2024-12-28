import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { engine } from "express-handlebars";
import path from "path";
import userRouter from "./routes/userRouter.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Handlebars setup
app.engine("hbs", engine({
  defaultLayout: false,
  extname: "hbs",
  allowProtoPropertiesByDefault: true // Allow access to prototype properties
}));
app.set("view engine", "hbs");
app.set("views", path.join(path.resolve(), "views")); // Use __dirname for the current directory path

// Serve static files
app.use(express.static(path.join(path.resolve(),"public"))); // Correct static file serving

// MongoDB connection
const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("MongoDB URI not found in environment variables");
  process.exit(1); // Exit with a non-zero status code to indicate failure
}

mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit with a non-zero status code to indicate failure
  });

// Routes
app.use("/", userRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
