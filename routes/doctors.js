import express from 'express';
import sql from 'mssql';
import config from '../dbconfig.js';

const router = express.Router();

// ✅ Get all doctors
router.get('/', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`
      SELECT DoctorID, Name, Specialization, Contact
      FROM Doctors
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error("❌ Error fetching doctors:", err.message);
    res.status(500).json({ message: "Server error: " + err.message }); // Send proper JSON
  }
});

// ✅ Add new doctor
router.post('/', async (req, res) => {
  const { Name, Specialization, Contact } = req.body;

  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('Name', sql.VarChar, Name)
      .input('Specialization', sql.VarChar, Specialization)
      .input('Contact', sql.VarChar, Contact)
      .query(`
        INSERT INTO Doctors (Name, Specialization, Contact)
        VALUES (@Name, @Specialization, @Contact)
      `);

    res.send("✅ Doctor added successfully");
  } catch (err) {
    console.error("❌ Error adding doctor:", err.message);
    res.status(500).json({ message: "Server error: " + err.message }); // Send proper JSON
  }
});

export default router;
