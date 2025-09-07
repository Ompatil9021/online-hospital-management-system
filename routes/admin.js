import express from 'express';
import sql from 'mssql';
import config from '../dbconfig.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM Admins');
    res.json(result.recordset);
  } catch (err) {
    console.error("❌ Admin route error:", err.message);
    res.status(500).send('Server error');
  }
});

export default router;
