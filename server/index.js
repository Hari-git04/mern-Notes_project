require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Allow only deployed client origin (set on Render) or fallback to '*'
const clientOrigin = process.env.CLIENT_URL || '*';
app.use(cors({ origin: clientOrigin }));

// Connect to MongoDB
const mongoUrl = process.env.MONGO_URL || process.env.MONGODB_URI;
if (!mongoUrl) {
  console.error('Missing MONGO_URL / MONGODB_URI environment variable');
  process.exit(1);
}
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Mount routes (create routes/noteRoutes.js as below)
const noteRoutes = require('./routes/noteRoutes');
app.use('/note', noteRoutes);

// Health check
app.get('/', (req, res) => res.send('API running'));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));