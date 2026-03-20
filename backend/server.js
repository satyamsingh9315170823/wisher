import express from "express";

import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";

import wishRoutes from "./routes/wishRoutes.js";



connectDB();

const app = express();

app.use(cors());

console.log(process.env.API_KEY);

app.use(express.json());

app.use(
  "/api/auth",

  authRoutes,
);

app.use(
  "/api/wish",

  wishRoutes,
);

app.listen(
  process.env.PORT,

  () => {
    console.log("Server running");
  },
);

