// routes/onlineConsultancy.js (final)
import express from 'express';
import sql from 'mssql';
import config from '../dbconfig.js';

const router = express.Router();

// 🔍 Get doctors by disease name (query param)
router.get('/', async (req, res) => {
  const { disease } = req.query;

  if (!disease) {
    return res.status(400).json({ message: 'Disease is required' });
  }

  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('disease', sql.VarChar, `%${disease}%`)
      .query(`
        SELECT D.DoctorID, D.Name AS FullName, S.SpecializationName AS Specialization, D.Contact AS ContactNumber
        FROM Consultations C
        JOIN Doctors D ON C.DoctorID = D.DoctorID
        JOIN Specializations S ON D.SpecializationID = S.SpecializationID
        JOIN Diseases DI ON C.DiseaseID = DI.DiseaseID
        WHERE DI.DiseaseName LIKE @disease
      `);

    res.json(result.recordset);
  } catch (err) {
    console.error("❌ Error fetching online consultancy:", err.message);
    res.status(500).send("Server error: " + err.message);
  }
});

export default router;
