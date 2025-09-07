// routes/rooms.js
import express from 'express';
import sql from 'mssql';
import config from '../dbconfig.js';

const router = express.Router();

// ✅ GET all rooms
router.get('/', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM Rooms');
    res.json(result.recordset);
  } catch (err) {
    console.error('❌ Error fetching rooms:', err.message);
    res.status(500).send('Server error: ' + err.message);
  }
});

// ✅ POST a new room
router.post('/', async (req, res) => {
  const { RoomNumber, Type, Status } = req.body;

  if (!RoomNumber || !Type || !Status) {
    return res.status(400).send('All fields are required');
  }

  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('RoomNumber', sql.VarChar, RoomNumber)
      .input('Type', sql.VarChar, Type)
      .input('Status', sql.VarChar, Status)
      .query(`
        INSERT INTO Rooms (RoomNumber, Type, Status)
        VALUES (@RoomNumber, @Type, @Status)
      `);

    res.send('✅ Room added successfully');
  } catch (err) {
    console.error('❌ Error adding room:', err.message);
    res.status(500).send('Server error: ' + err.message);
  }
});

export default router;
