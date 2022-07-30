import express from "express";
const router = express.Router();
import bcrpyt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

import { config } from "../config";
import User from "../models/auth";

router.post("/signup", async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: bcrpyt.hashSync(req.body.password, 10),
    name: req.body.name,
  });
  user.save((err, user) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      message: "Signed up successfully",
    });
  });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid email or password");
  const isMatch = bcrpyt.compareSync(password, user.password!);
  if (!isMatch) return res.status(400).send("Invalid email or password");
  const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
  res.status(200).json({
    message: "Signed in successfully",
  });
});

router.get("/signout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signed out successfully",
  });
});

router.post("/isLogined", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(400).send("Not logged in");
  jwt.verify(token, config.JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      res.status(401).json({
        message: "Invalid token",
      });
    } else {
      let verified_token = jwt.decode(token) as JwtPayload;
      if (verified_token) {
        User.findById(verified_token.id, (err: Error, user: any) => {
          if (err) return res.status(400).send(err);
          if (!user) return res.status(400).send("Invalid token");
          res.status(200).json({
            message: "Is logined",
          });
        });
      }
    }
  });
});

export default router;
