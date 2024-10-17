import express from "express";
import cors from "cors";
import { config } from "dotenv";
import dbConnect from "./src/config/dbConnect.js";
import compilerRoutes from "./src/routes/copmiler.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import cookieParser from "cookie-parser";
config();
const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(express.static("dist"));
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://code-canvas-client.vercel.app"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  cors({
    origin: ["https://code-canvas-client.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use("/api/compiler", compilerRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  return res.status(200).send("OK");
});

const PORT = process.env.PORT || 4000;
dbConnect();

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
