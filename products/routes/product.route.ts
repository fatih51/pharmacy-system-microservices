import express from "express";
const router = express.Router();

import Product from "../models/product";
import Guard from "../guards/auth.guard";

router.get("/products", (req, res) => {
  Product.find()
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
});

router.get("/product/:id", (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
});

router.post("/newProduct", Guard,(req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  });
  product.save((err, product) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(product);
  });
});

export default router;
