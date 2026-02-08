require('dotenv').config();

const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes');
const { setupSwagger } = require('./config/swagger');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', apiRoutes);
setupSwagger(app);

module.exports = { app };
