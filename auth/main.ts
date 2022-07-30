import express from "express";
import { config } from "./config";
const app = express();
import cors from "cors";
import { connection } from "./db";

import AuthRouter from "./routes/auth.route";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", AuthRouter);
app.use(cors({
  origin: '*'
}));

app.listen(config.PORT, () => {
  connection.then(() => {
    console.log("Connected to database");
  }).catch((err) => {
    console.log("Error connecting to database", err);
  });
  console.log("Server started on port",config.PORT);
});
