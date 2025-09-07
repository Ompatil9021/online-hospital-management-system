// routes/billing.js (ESM-ready)
import express from 'express';
import sql from 'mssql';
import config from '../dbconfig.js';

const router = express.Router();

// 🧾 Get all bills with patient name
router.get('/', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`
      SELECT B.*, P.Name AS PatientName
      FROM Billing B
      JOIN Patients P ON B.PatientID = P.PatientID
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error("❌ Error fetching billing:", err.message);
    res.status(500).send("Server error: " + err.message);
  }
});

// ➕ Add a new bill
router.post('/', async (req, res) => {
  const { PatientID, Amount, PaymentStatus } = req.body;
  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('PatientID', sql.Int, PatientID)
      .input('Amount', sql.Decimal(10, 2), Amount)
      .input('PaymentStatus', sql.VarChar, PaymentStatus)
      .query(`
        INSERT INTO Billing (PatientID, Amount, PaymentStatus)
        VALUES (@PatientID, @Amount, @PaymentStatus)
      `);
    res.send("✅ Bill added successfully");
  } catch (err) {
    console.error("❌ Error adding bill:", err.message);
    res.status(500).send("Server error: " + err.message);
  }
});

// ❌ Delete a bill
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Billing WHERE BillID = @id');
    res.send("✅ Bill deleted");
  } catch (err) {
    console.error("❌ Error deleting bill:", err.message);
    res.status(500).send("Server error: " + err.message);
  }
});

// 📊 Billing summary
router.get('/summary', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`
      SELECT 
        COUNT(*) AS totalBills,
        SUM(Amount) AS totalAmount,
        MAX(Amount) AS highestBill,
        MIN(Amount) AS lowestBill
      FROM Billing
    `);
    res.json(result.recordset[0]);
  } catch (err) {
    console.error("❌ Error getting summary:", err.message);
    res.status(500).send("Server error: " + err.message);
  }
});

export default router;
