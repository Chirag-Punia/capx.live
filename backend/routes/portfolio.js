import express from "express";
import Portfolio from "../models/Portfolio.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const portfolio = await Portfolio.find({ userId: req.user.id });
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch portfolio data" });
  }
});

router.post("/", async (req, res) => {
  const { ticker, quantity, price } = req.body;

  try {
    const newStock = new Portfolio({
      userId: req.user.id,
      ticker,
      quantity,
      price,
    });
    await newStock.save();
    res.status(201).json(newStock);
  } catch (error) {
    res.status(400).json({ error: "Failed to add stock to portfolio" });
  }
});

router.put("/:id", async (req, res) => {
  const { ticker, quantity, price } = req.body;

  try {
    const updatedStock = await Portfolio.findByIdAndUpdate(
      req.params.id,
      { ticker, quantity, price },
      { new: true }
    );

    if (!updatedStock) {
      return res.status(404).json({ error: "Stock not found" });
    }

    res.json(updatedStock);
  } catch (error) {
    res.status(400).json({ error: "Failed to update stock" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedStock = await Portfolio.findByIdAndDelete(req.params.id);

    if (!deletedStock) {
      return res.status(404).json({ error: "Stock not found" });
    }

    res.json({ message: "Stock deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete stock" });
  }
});

export default router;
