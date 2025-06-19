import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Rating,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
    rating: 0,
    product: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Predefined list of products
  const products = [
    'Product A',
    'Product B',
    'Product C',
    'Product D',
    'Product E',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      rating: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!formData.feedback) {
      setError('Please provide your feedback');
      setIsSubmitting(false);
      return;
    }

    if (!formData.rating) {
      setError('Please provide a rating');
      setIsSubmitting(false);
      return;
    }

    if (!formData.product) {
      setError('Please select a product');
      setIsSubmitting(false);
      return;
    }

    try {
      await api.post('/api/feedback', formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        feedback: '',
        rating: 0,
        product: '',
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError('Error submitting feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(90deg, #a8e063 0%, #ffffff 50%, #a8e063 100%)', py: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, boxShadow: '0 8px 32px rgba(168,224,99,0.13)', animation: 'fadeIn 1s', width: '100%' }}>
        <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; }}`}</style>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#1976d2', fontWeight: 700 }}>
          Give Feedback
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name (Optional)"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            sx={{ background: '#f5fafd', borderRadius: 2 }}
          />

          <TextField
            fullWidth
            label="Email (Optional)"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            sx={{ background: '#f5fafd', borderRadius: 2 }}
          />

          <FormControl fullWidth margin="normal" sx={{ background: '#f5fafd', borderRadius: 2 }}>
            <InputLabel>Product</InputLabel>
            <Select
              name="product"
              value={formData.product}
              onChange={handleChange}
              label="Product"
              required
            >
              {products.map((product) => (
                <MenuItem key={product} value={product}>
                  {product}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Feedback"
            name="feedback"
            multiline
            rows={4}
            value={formData.feedback}
            onChange={handleChange}
            margin="normal"
            required
            sx={{ background: '#f5fafd', borderRadius: 2 }}
          />

          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography component="legend">Rating</Typography>
            <Rating
              name="rating"
              value={formData.rating}
              onChange={handleRatingChange}
              size="large"
            />
          </Box>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            size="large"
            sx={{ mt: 2, fontWeight: 700, fontSize: '1.1rem', borderRadius: 3, background: 'linear-gradient(90deg, #a8e063 0%, #56ab2f 100%)', boxShadow: '0 2px 12px rgba(168,224,99,0.13)' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </form>

        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={() => setSuccess(false)}
        >
          <Alert
            onClose={() => setSuccess(false)}
            severity="success"
            sx={{ width: '100%' }}
          >
            Thank you for your feedback!
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default FeedbackForm; 