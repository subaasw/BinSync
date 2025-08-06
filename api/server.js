import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import database from "./src/configs/db.js";
import { PORT } from "./src/configs/index.js";

const corsOptions = {
  origin: true,
  credentials: true,
};

const app = express();

app.use(cookieParser());
app.use(cors(corsOptions));

app.listen(PORT, () => {
  console.log(`Server Running on port: ${PORT}`);
});
