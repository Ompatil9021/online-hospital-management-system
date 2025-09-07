import express from 'express';
import sql from 'mssql';
import config from '../dbconfig.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { disease } = req.query;

  try {
    const pool = await sql.connect(config);
    const request = pool.request();

    if (disease) {
      request.input('disease', sql.VarChar, disease);
      const result = await request.query(`
        SELECT DoctorID, Name AS FullName, Specialization, Contact
        FROM Doctors
        WHERE Specialization LIKE '%' + @disease + '%'
      `);
      res.json(result.recordset);
    } else {
      const result = await pool.request().query(`
        SELECT DoctorID, Name AS FullName, Specialization, Contact
        FROM Doctors
      `);
      res.json(result.recordset);
    }
  } catch (err) {
    console.error('❌ Online Consultancy error:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

export default router;
