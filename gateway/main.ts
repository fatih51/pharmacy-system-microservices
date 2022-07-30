import express from "express";
import cors from "cors";
import proxy from "express-http-proxy";

const app = express();

app.use(cors({
  origin: '*'
}));
app.use(express.json());

app.use("/", proxy("http://localhost:3003"));
app.use("/", proxy("http://localhost:3002"));
app.use("/", proxy("http://localhost:3000"));
app.use("/", proxy("http://localhost:3001"));

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
