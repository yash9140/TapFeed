import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Grid,
  Card,
  CardContent,
  Rating,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  InputAdornment,
  Alert,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { io } from 'socket.io-client';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

const AdminDashboard = () => {
  const { token } = useAuth();
  const [feedback, setFeedback] = useState([]);
  const [stats, setStats] = useState({
    totalFeedback: 0,
    averageRating: 0,
    ratingDistribution: {},
    productStats: {},
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterRating, setFilterRating] = useState('all');
  const [filterProduct, setFilterProduct] = useState('all');
  const [error, setError] = useState('');

  const fetchFeedback = useCallback(async () => {
    try {
      const response = await api.get('/api/admin/feedback', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedback(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setError('Failed to fetch feedback data');
    }
  }, [token]);

  const fetchStats = useCallback(async () => {
    try {
      const response = await api.get('/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError('Failed to fetch statistics');
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      setError('Authentication required');
      return;
    }

    fetchFeedback();
    fetchStats();

    // Connect to WebSocket
    const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000', {
      auth: {
        token,
      },
      withCredentials: true,
      transports: ['websocket'],
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setError('Failed to connect to real-time updates');
    });

    socket.on('newFeedback', (newFeedback) => {
      setFeedback((prev) => [newFeedback, ...prev]);
      fetchStats(); // Refresh stats when new feedback arrives
    });

    return () => {
      socket.disconnect();
    };
  }, [token, fetchFeedback, fetchStats]);

  // Get unique products from feedback
  const products = [...new Set(feedback.map((item) => item.product))];

  // Prepare data for product ratings chart
  const productRatingsData = products.map(product => {
    const productFeedback = feedback.filter(item => item.product === product);
    const avgRating = productFeedback.reduce((acc, curr) => acc + curr.rating, 0) / productFeedback.length;
    return {
      name: product,
      averageRating: parseFloat(avgRating.toFixed(1)),
      feedbackCount: productFeedback.length
    };
  }).sort((a, b) => b.averageRating - a.averageRating);

  // Filter and sort feedback
  const filteredAndSortedFeedback = feedback
    .filter((item) => {
      const matchesSearch = item.feedback.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.product && item.product.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesRating = filterRating === 'all' || item.rating === parseInt(filterRating);
      const matchesProduct = filterProduct === 'all' || item.product === filterProduct;

      return matchesSearch && matchesRating && matchesProduct;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'date':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'product':
          return (a.product || '').localeCompare(b.product || '');
        case 'popularity':
          const aPopularity = stats.productStats[a.product]?.count || 0;
          const bPopularity = stats.productStats[b.product]?.count || 0;
          return bPopularity - aPopularity;
        default:
          return 0;
      }
    });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, minHeight: '100vh', background: 'linear-gradient(90deg, #a8e063 0%, #ffffff 50%, #a8e063 100%)', py: 6, borderRadius: 4, animation: 'fadeIn 1s' }}>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; }}`}</style>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1976d2', fontWeight: 700 }}>
        Admin Dashboard
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 24px rgba(168,224,99,0.13)' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Feedback
              </Typography>
              <Typography variant="h5">{stats.totalFeedback}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 24px rgba(168,224,99,0.13)' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average Rating
              </Typography>
              <Typography variant="h5">
                {stats.averageRating.toFixed(1)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 24px rgba(168,224,99,0.13)' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Products
              </Typography>
              <Typography variant="h5">{products.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Product Ratings Chart */}
      <Paper sx={{ p: 2, mb: 4, borderRadius: 3, boxShadow: '0 2px 12px rgba(168,224,99,0.10)' }}>
        <Typography variant="h6" gutterBottom>
          Product Ratings
        </Typography>
        <Box sx={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={productRatingsData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="averageRating" name="Average Rating" fill="#8884d8" />
              <Bar yAxisId="right" dataKey="feedbackCount" name="Feedback Count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      {/* Rating Distribution */}
      <Paper sx={{ p: 2, mb: 4, borderRadius: 3, boxShadow: '0 2px 12px rgba(168,224,99,0.10)' }}>
        <Typography variant="h6" gutterBottom>
          Rating Distribution
        </Typography>
        <Grid container spacing={2}>
          {[5, 4, 3, 2, 1].map((rating) => (
            <Grid item xs={12} sm={6} md={2.4} key={rating}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Rating value={rating} readOnly size="small" />
                <Typography>
                  {typeof stats.ratingDistribution[rating] === 'object' 
                    ? stats.ratingDistribution[rating].count || 0
                    : stats.ratingDistribution[rating] || 0}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Filters and Search */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 200 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="product">Product</MenuItem>
            <MenuItem value="popularity">Popularity</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Rating</InputLabel>
          <Select
            value={filterRating}
            label="Rating"
            onChange={(e) => setFilterRating(e.target.value)}
          >
            <MenuItem value="all">All Ratings</MenuItem>
            {[5, 4, 3, 2, 1].map((rating) => (
              <MenuItem key={rating} value={rating}>
                {rating} Stars
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Product</InputLabel>
          <Select
            value={filterProduct}
            label="Product"
            onChange={(e) => setFilterProduct(e.target.value)}
          >
            <MenuItem value="all">All Products</MenuItem>
            {products.map((product) => (
              <MenuItem key={product} value={product}>
                {product}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Feedback Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(168,224,99,0.10)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Feedback</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedFeedback.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  {new Date(item.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{item.name || 'Anonymous'}</TableCell>
                <TableCell>{item.email || 'N/A'}</TableCell>
                <TableCell>{item.product || 'N/A'}</TableCell>
                <TableCell>
                  <Rating value={item.rating} readOnly size="small" />
                </TableCell>
                <TableCell>{item.feedback}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminDashboard; 