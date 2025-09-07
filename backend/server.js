import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import patients from './routes/patients.js';
import doctors from './routes/doctors.js';
import consultations from './routes/consultations.js';
import medicalHistory from './routes/medicalHistory.js';
import rooms from './routes/rooms.js';
import billing from './routes/billing.js';
import discharge from './routes/discharge.js';
import dashboard from './routes/dashboard.js';
import dietPlans from './routes/dietPlans.js';
import onlineConsultancy from './routes/onlineConsultancy.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/patients', discharge); // ✅ Discharge comes first
app.use('/api/patients', patients);
app.use('/api/doctors', doctors);
app.use('/api/consultations', consultations);
app.use('/api/medical-history', medicalHistory);
app.use('/api/rooms', rooms);
app.use('/api/billing', billing);
app.use('/api/dashboard', dashboard);
app.use('/api/diet-plans', dietPlans);
app.use('/api/online-consultancy', onlineConsultancy);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(5000, () => {
  console.log('✅ Server running on http://localhost:5000');
});
