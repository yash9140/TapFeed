const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// Submit feedback
router.post('/', async (req, res) => {
  try {
    const { name, email, feedback, rating, product } = req.body;

    if (!feedback || !rating || !product) {
      return res.status(400).json({ message: 'Feedback, rating, and product are required' });
    }

    const newFeedback = new Feedback({
      name,
      email,
      feedback,
      rating,
      product
    });

    await newFeedback.save();

    // Emit socket event for real-time updates
    req.app.get('io').emit('newFeedback', newFeedback);

    res.status(201).json(newFeedback);
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ message: 'Error submitting feedback' });
  }
});

module.exports = router; 