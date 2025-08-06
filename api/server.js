import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const corsOptions = {
  origin: true,
  credentials: true,
};

const app = express();

app.use(cookieParser());
app.use(cors(corsOptions));

app.listen(8800, () => {
  console.log("Connected!");
});
