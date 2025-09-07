// routes/medicalHistory.js
import express from 'express';
import sql from 'mssql';
import config from '../dbconfig.js';

const router = express.Router();

// 🔍 Get all history (optional usage)
router.get('/', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM MedicalHistory');
    res.json(result.recordset);
  } catch (err) {
    console.error("❌ Error fetching all history:", err.message);
    res.status(500).send("Server error: " + err.message);
  }
});

// 🔍 Get history for a specific patient
router.get('/:patientId', async (req, res) => {
  const { patientId } = req.params;

  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('PatientID', sql.Int, patientId)
      .query(`
        SELECT Condition, DiagnosisDate, Notes
        FROM MedicalHistory
        WHERE PatientID = @PatientID
        ORDER BY DiagnosisDate DESC
      `);

    res.json(result.recordset);
  } catch (err) {
    console.error("❌ Error fetching patient history:", err.message);
    res.status(500).json({ message: "Error fetching patient history" });
  }
});

export default router;
