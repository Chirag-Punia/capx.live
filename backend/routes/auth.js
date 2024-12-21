import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Stock from '../models/Stock.js';
import axios from 'axios';

const router = express.Router();
const defaultStocks = [
  { symbol: 'AAPL', companyName: 'Apple Inc.', purchasePrice: 150 },
  { symbol: 'GOOGL', companyName: 'Alphabet Inc.', purchasePrice: 2800 },
  { symbol: 'AMZN', companyName: 'Amazon.com Inc.', purchasePrice: 3500 },
  { symbol: 'MSFT', companyName: 'Microsoft Corporation', purchasePrice: 300 },
  { symbol: 'TSLA', companyName: 'Tesla, Inc.', purchasePrice: 800 }
];

async function getCurrentPrice(symbol) {
  const apiKey = "cti6kkhr01qm6mum8mngcti6kkhr01qm6mum8mo0"; // Your Finnhub API key
  try {
    const response = await axios.get(`https://finnhub.io/api/v1/quote`, {
      params: {
        symbol: symbol,
        token: apiKey
      }
    });

    // Ensure the 'c' (current price) is in the response
    if (response.data && response.data.c) {
      return response.data.c;
    } else {
      console.error('Error fetching current price for symbol:', symbol);
      return null; // Return null if there is no valid price
    }
  } catch (error) {
    console.error('Error fetching stock price:', error);
    return null; // Handle any errors gracefully
  }
}
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Create the user
    const user = new User({ name, email, password });
    await user.save();


    const userStocks = await Promise.all(defaultStocks.map(async (stock) => {
      const currentPrice = await getCurrentPrice(stock.symbol);
      console.log(`Fetched current price for ${stock.symbol}:`, currentPrice); // Debug log
    
      return {
        user: user._id, // Associate the stock with the user
        symbol: stock.symbol,
        companyName: stock.companyName,
        purchasePrice: stock.purchasePrice,
        currentPrice: currentPrice || stock.purchasePrice, // Fallback to purchasePrice if no currentPrice
        quantity: 1
      };
    }));
    
    console.log('User stocks:', userStocks); // Debug log to see the final stock objects
    
    // Save the default stocks
    await Stock.insertMany(userStocks);
    

    res.status(201).json({ message: 'User created and default stocks added' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user or adding stocks' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;