require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// allow only deployed client origin (or '*' fallback)
const clientOrigin = process.env.CLIENT_URL || '*';
app.use(cors({ origin: clientOrigin }));

// Connect to MongoDB
const mongoUrl = process.env.MONGO_URL || process.env.MONGODB_URI;
if (!mongoUrl) {
  console.error('Missing MONGO_URL / MONGODB_URI');
  process.exit(1);
}
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Mount routes (replace with your existing routes if different)
const noteRoutes = require('./routes/noteRoutes');
app.use('/note', noteRoutes);

// Root / health check
app.get('/', (req, res) => res.send('API running'));

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


