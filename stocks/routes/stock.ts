import express from "express";
const router = express.Router();
import axios from "axios";
import Stock from "../models/stock";
import Guard from "../guards/auth.guard";

router.get("/stocks", (req, res) => {
  Stock.find({})
    .then((stocks) => {
      console.log(stocks);
      res.json(stocks);
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
});

router.get("/stock/:id", (req, res) => {
  Stock.findById(req.params.id)
    .then((stock) => {
      res.json(stock);
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
})

router.post("/newStock", Guard ,async (req, res) => {
  let product = {};
  await axios
    .get("http://localhost:3000/product/" + req.body.productId)
    .then((response) => {
      product = response.data;
    });
  const newStock = new Stock({
    product: product,
    quantity: req.body.quantity,
  });
  newStock
    .save()
    .then(() => {
      res.json("Stock added successfully");
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
});

export default router;
