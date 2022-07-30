import cors from "cors";
import express from "express";
import { config } from "./config";
const app = express();
import { connection } from "./db";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import StockRoute from "./routes/stock";

app.use("/", StockRoute);

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
