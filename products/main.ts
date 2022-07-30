import cors from "cors";
import express from "express";
import { config } from "./config";
const app = express();
import { connection } from "./db";

import ProductRouter from "./routes/product.route";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: '*'
}));

app.use("/", ProductRouter);

app.listen(config.PORT, () => {
  connection.then(() => {
    console.log("Connected to database");
  }).catch((err) => {
    console.log("Error connecting to database", err);
  });
  console.log("Server started on port",config.PORT);
});
