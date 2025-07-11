const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
require('./config/passport');
const detectRoutes = require('./routes/detectRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();
const recipeRoutes = require('./routes/recipeRoutes');
const path = require('path');
const geminiRoutes = require('./routes/geminiRoutes');

// Configure CORS
app.use(cors({
  origin: '*', // Allow requests from any origin during development
  credentials: true
}));

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginOpenerPolicy: { policy: "unsafe-none" },
  crossOriginEmbedderPolicy: false
}));
app.use(express.json());
app.use(passport.initialize());

// API Routes
app.use('/api/recipe', recipeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', detectRoutes);
app.use('/api/gemini', geminiRoutes);

// Serve static files
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Catch-all route for SPA
// app.get('*', (req, res) => {
//   res.sendFile(path.join(publicPath, 'index.html'));
// });

module.exports = app;