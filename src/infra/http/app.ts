import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { v1Router } from "./api/v1";
import { isProduction } from "../../configs";
import env from "../../configs/env";
import db_connection from "../../core/database";
import logger from "../../core/logger";
const app = express();
const origin = {
  origin: isProduction ? env.ORIGIN_URL : "*",
};

app.use([
  bodyParser.json(),
  cors(origin),
  compression(),
  helmet(),
  morgan("combined"),
]);

app.use("v1", v1Router);

const server = app.listen(process.env.PORT || 8080, () => {
  db_connection();
  console.log(`[App] : server listening on port ${process.env.PORT || 8080}`);
});

process.on("uncaughtException", (err) => {
  logger.error(err.stack);
  server.close(() => {
    console.log("Stopped server due to uncaughtException");
    console.log(err);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal recieved, Stopping server");
  server.close(() => {
    console.log("Stopped server");
  });
});

export { app };
