import express from 'express';
import sql from 'mssql';
import config from '../dbconfig.js';

const router = express.Router();

// ✅ Add a new patient
router.post('/', async (req, res) => {
  const { Name, Age, Gender, Contact, RoomNo, Address } = req.body;
  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('Name', sql.VarChar, Name)
      .input('Age', sql.Int, Age)
      .input('Gender', sql.VarChar, Gender)
      .input('Contact', sql.VarChar, Contact)
      .input('RoomNo', sql.Int, RoomNo)
      .input('Address', sql.VarChar, Address)
      .input('Discharged', sql.Bit, 0)
      .query(`
        INSERT INTO Patients (Name, Age, Gender, Contact, RoomNo, Address, Discharged)
        VALUES (@Name, @Age, @Gender, @Contact, @RoomNo, @Address, @Discharged)
      `);
    res.send('✅ Patient added successfully');
  } catch (err) {
    console.error("❌ Error adding patient:", err.message);
    res.status(500).send("Server error: " + err.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`
      SELECT * FROM Patients WHERE Discharged = 0
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error("❌ Error fetching patients:", err.message);
    res.status(500).send("Server error: " + err.message);
  }
});

export default router;