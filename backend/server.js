const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 4000;

const pool = new Pool({
  host: process.env.DB_HOST || 'postgres-service',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'appdb',
  port: process.env.DB_PORT || 5432,
});

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Backend is healthy' });
});

app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Hello from Backend API!', dbTime: result.rows[0].now });
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).json({ error: 'Database connection failed', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Backend service running on port ${port}`);
});