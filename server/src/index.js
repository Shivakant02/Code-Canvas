import express from "express";
import cors from "cors";
import { config } from "dotenv";
import dbConnect from "../src/config/dbConnect.js";
config();
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  return res.status(200).send("OK");
});

const PORT = process.env.PORT || 4000;
dbConnect();

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
