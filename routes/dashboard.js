// routes/dashboard.js
import express from 'express';
import sql from 'mssql';
import config from '../dbconfig.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`
      SELECT 
        (SELECT COUNT(*) FROM Patients) AS totalPatients,
        (SELECT COUNT(*) FROM Doctors) AS totalDoctors,
        (SELECT AVG(Age) FROM Patients) AS avgAge;

      SELECT TOP 3 Condition, COUNT(*) AS frequency
      FROM MedicalHistory
      GROUP BY Condition
      ORDER BY frequency DESC;
    `);

    const totals = result.recordsets[0][0]; // First result set

    res.json({
      totalPatients: totals.totalPatients,
      totalDoctors: totals.totalDoctors,
      avgAge: totals.avgAge,
      topDiseases: result.recordsets[1]
    });
  } catch (err) {
    console.error("❌ Dashboard error:", err.message);
    res.status(500).json({ message: "Error loading dashboard" });
  }
});

export default router;
