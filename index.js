import express from "express";
import hpp from "hpp";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import ExpressMongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import Router from "./route/api.js";
import {
  PORT,
  DATABASE,
  OPTIONS,
  MAX_JSON_SIZE,
  URL_ENCODE,
  REQUEST_TIME,
  REQUEST_NUMBER,
} from "./app/config/config.js";

const app = express();

mongoose
  .connect(DATABASE, OPTIONS)
  .then((res) => {
    console.log(`DB Connected`);
  })
  .catch((err) => {
    console.log(`DB Not Connected` + err);
  });
app.use(express.urlencoded({ extended: URL_ENCODE }));
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(ExpressMongoSanitize());
app.use(hpp());

app.use(rateLimit({ windowMs: REQUEST_TIME, max: REQUEST_NUMBER }));

app.set("etag", false);
app.use("/api/v1", Router);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
