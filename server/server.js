require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const clientOrigin = process.env.CLIENT_URL || '*';
app.use(cors({ origin: clientOrigin }));

const mongoUrl = process.env.MONGO_URL || process.env.MONGODB_URI;
if (!mongoUrl) {
  console.error('Missing MONGO_URL / MONGODB_URI');
  process.exit(1);
}
mongoose.connect(mongoUrl)
  .then(() => console.log('MongoDB connected'))
  .catch(err => { console.error(err); process.exit(1); });

app.get('/', (req, res) => res.send('API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));


