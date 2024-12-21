import express from "express";
import axios from "axios";
import { auth } from "../middleware/auth.js";
import Stock from "../models/Stock.js";
import dotenv from "dotenv";
const router = express.Router();
dotenv.config();

router.get("/", auth, async (req, res) => {
  try {
    const stocks = await Stock.find({ user: req.userId });
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/", auth, async (req, res) => {
  try {
    const { symbol, companyName, purchasePrice, quantity } = req.body;

    const apiKey = process.env.FINNHUB_API_KEY;
    const response = await axios.get("https://finnhub.io/api/v1/quote", {
      params: { symbol, token: apiKey },
    });
    const currentPrice = response.data.c || purchasePrice;

    const stock = new Stock({
      user: req.userId,
      symbol,
      companyName,
      purchasePrice,
      currentPrice,
      quantity,
    });

    await stock.save();
    res.status(201).json(stock);
  } catch (error) {
    console.error("Error adding stock:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const stock = await Stock.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );

    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const stock = await Stock.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    res.json({ message: "Stock deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
