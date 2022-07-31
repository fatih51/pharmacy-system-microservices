import axios from "axios";
import express from "express";
const router = express.Router();

import Code from "../models/code";

const generateCode = () => {
  let code = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 6; i++)
    code += possible.charAt(Math.floor(Math.random() * possible.length));
  return code;
};

router.get("/codes", (req, res) => {
  Code.find()
    .then((stocks) => {
      res.json(stocks);
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
});

router.get("/code/:code", (req, res) => {
  Code.find({ code: req.params.code })
    .then((codes) => {
      res.json(codes);
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
});

router.post("/newCode", async (req, res) => {
  const productList = req.body.productList;
  let products: Object[] = [];
  for (let i = 0; i < productList.length; i++) {
    await axios
      .get("http://localhost:3000/product/" + productList[i])
      .then((response) => {
        products.push(response.data);
      });
  }
  const newCode = new Code({
    code: generateCode(),
    product: products,
    identify: req.body.identify,
  });
  newCode
    .save()
    .then(() => {
      res.json({
        message: "New code added successfully",
      });
    })
    .catch((err) => {
      res.json("Error: " + err);
    });
  console.log(req.body.identify);
  await axios
    .patch("http://localhost:3004/identify/newCode", {
      identify: req.body.identify,
      code: newCode.code,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

export default router;
