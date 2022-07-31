import express from "express";
const router = express.Router();

import Identify from "../models/identify";

router.get('/identifies', async (req, res) => {
  const identifies = await Identify.find();
  res.send(identifies);
});

router.get("/identify/:id", async (req, res) => {
  const identify = await Identify.findById(req.params.id);
  res.send(identify);
});

router.post("/newIdentify", async (req, res) => {
  const { identify, name } = req.body;
  const newIdentify = new Identify({ identify, name });
  await newIdentify.save();
  res.send(newIdentify);
})

router.patch("/identify/newCode", async (req, res) => {
  const { identify, code } = req.body;
  const newIdentify = await Identify.find({ identify });
  newIdentify[0].codes.push(code);
  await newIdentify[0].save();
  res.send(newIdentify);
})

export default router;
