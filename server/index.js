import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/db.js";
import mediaRoute from "./routes/media.route.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import purchaseRoute from "./routes/coursePurchase.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({});

// Call database connection here
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// default middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Default Route - Show a welcome message
app.get("/", (_, res) => {
  res.send(
    "Welcome to the Learn Hub API! This is the backend for your coding course platform."
  );
});

//APIs
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
