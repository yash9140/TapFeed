const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Feedback = require('../models/Feedback');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');

// Admin login (hardcoded credentials)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    // Hardcoded credentials
    const hardcodedEmail = 'admin@gmail.com';
    const hardcodedPassword = 'admin1234';

    if (email.toLowerCase() !== hardcodedEmail || password !== hardcodedPassword) {
      console.log('Invalid credentials for admin login');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: 'hardcoded-admin-id', role: 'admin' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    console.log('Login successful for admin:', email);
    res.json({
      token,
      admin: {
        id: 'hardcoded-admin-id',
        email: hardcodedEmail
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
});

// Middleware to verify admin token
const verifyAdminToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Get all feedback
router.get('/feedback', verifyAdminToken, async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Error fetching feedback' });
  }
});

// Get statistics
router.get('/stats', verifyAdminToken, async (req, res) => {
  try {
    const totalFeedback = await Feedback.countDocuments();
    const feedback = await Feedback.find();

    // Calculate average rating
    const totalRating = feedback.reduce((sum, item) => sum + item.rating, 0);
    const averageRating = totalFeedback > 0 ? totalRating / totalFeedback : 0;

    // Calculate rating distribution
    const ratingDistribution = {};
    for (let i = 1; i <= 5; i++) {
      const count = await Feedback.countDocuments({ rating: i });
      ratingDistribution[i] = count;
    }

    // Calculate product statistics
    const productStats = {};
    const products = [...new Set(feedback.map(item => item.product))];
    
    for (const product of products) {
      const productFeedback = feedback.filter(item => item.product === product);
      const productRating = productFeedback.reduce((sum, item) => sum + item.rating, 0);
      const avgRating = productFeedback.length > 0 ? productRating / productFeedback.length : 0;
      
      productStats[product] = {
        count: productFeedback.length,
        averageRating: parseFloat(avgRating.toFixed(1))
      };
    }

    res.json({
      totalFeedback,
      averageRating,
      ratingDistribution,
      productStats
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Error fetching statistics' });
  }
});

module.exports = router; 