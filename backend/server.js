const express = require('express');
const cors = require('cors');
const axios = require('axios');  // Import axios
const connectDB = require('./config/db');
const loanRoutes = require('./routes/loanRoutes');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/loans', loanRoutes);

// Keep-alive request to the server itself every 10 minutes
setInterval(() => {
  axios.get(`http://localhost:${PORT}/keep-alive`)
    .then(() => {
      console.log('Keep-alive request sent');
    })
    .catch((err) => {
      console.error('Error sending keep-alive request:', err.message);
    });
}, 600000);  // 600,000 milliseconds = 10 minutes

// Keep-alive route
app.get('/keep-alive', (req, res) => {
  res.send('Server is alive');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
