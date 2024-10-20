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
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
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
