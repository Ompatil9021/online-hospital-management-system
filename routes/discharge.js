import express from 'express';
import sql from 'mssql';
import config from '../dbconfig.js';

const router = express.Router();

// 🔄 Soft discharge: update Discharged = 1
router.delete('/discharge', async (req, res) => {
  const { patientId, reason } = req.body;

  if (!patientId) {
    return res.status(400).json({ message: 'Patient ID is required' });
  }

  try {
    const pool = await sql.connect(config);

    // ✅ Update only if patient exists
    const check = await pool.request()
      .input('PatientID', sql.Int, patientId)
      .query('SELECT PatientID FROM Patients WHERE PatientID = @PatientID');

    if (check.recordset.length === 0) {
      return res.status(404).json({ message: `Patient ID ${patientId} not found.` });
    }

    // 🔄 Mark as discharged
    await pool.request()
      .input('PatientID', sql.Int, patientId)
      .query('UPDATE Patients SET Discharged = 1 WHERE PatientID = @PatientID');

    res.json({ message: `Patient ${patientId} discharged successfully. Reason: ${reason}` });
  } catch (err) {
    console.error('❌ Error in discharge:', err.message);
    res.status(500).json({ message: 'Error discharging patient' });
  }
});

export default router;
