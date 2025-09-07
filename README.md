# 🏥 Hospital Management System (HMS)

This project is a **Node.js + Express.js + Microsoft SQL Server** based Hospital Management System with a clean **HTML/CSS frontend**.  
It manages **patients, doctors, billing, rooms, diet plans, consultations, medical history, and discharges**.

---

## 🚀 Features

- 👤 **Patients Management** – Add, update, delete patients.  
- 🩺 **Doctors Management** – Store specialization and contact.  
- 💬 **Consultations** – Track doctor-patient consultations.  
- 🖥️ **Online Consultancy** – Search doctors by disease.  
- 📝 **Medical History** – Add and view patient medical records.  
- 🥗 **Diet Plans** – Disease-specific diet suggestions.  
- 🚪 **Rooms** – Assign & manage room availability.  
- 💳 **Billing** – Generate bills for patients.  
- 🔐 **Admin Login** – Admin authentication.  
- 🗑️ **Discharge** – Discharge patients with reasons (Recovered, Transferred, etc.).  

---

## ⚙️ Tech Stack

- **Backend**: Node.js, Express.js  
- **Frontend**: HTML, CSS, JavaScript  
- **Database**: Microsoft SQL Server  

---

## 📂 Project Structure

HospitalManagementSystem/
│
├── backend/
│ ├── server.js # Main Express server
│ ├── dbconfig.js # SQL Server configuration
│ ├── routes/ # Route files
│ │ ├── patients.js
│ │ ├── doctors.js
│ │ ├── consultations.js
│ │ ├── medicalHistory.js
│ │ ├── dietPlans.js
│ │ ├── rooms.js
│ │ ├── billing.js
│ │ ├── admin.js
│ │ ├── onlineConsultancy.js
│ │ └── discharge.js
│
├── public/ # Frontend files
│ ├── index.html
│ ├── patients.html
│ ├── doctors.html
│ ├── consultancy.html
│ ├── medicalHistory.html
│ ├── discharge.html
│ ├── billing.html
│ ├── rooms.html
│ ├── adminLogin.html
│ ├── styles.css
│ └── script.js
│
└── README.md

yaml
Copy code

---

## 🛠️ Setup Instructions


2️⃣ Install Dependencies
bash
Copy code
cd backend
npm install express body-parser cors mssql
3️⃣ Configure Database
Create a SQL Server database named NewHMS.

Run the provided SQL script (sql-schema.sql) to create all tables.

Update dbconfig.js with your SQL Server credentials:

js
Copy code
module.exports = {
  user: 'your_username',
  password: 'your_password',
  server: 'localhost',
  database: 'NewHMS',
  options: {
    trustServerCertificate: true
  }
};
4️⃣ Run the Server
bash
Copy code
node server.js
The server will start at:
👉 http://localhost:5000

5️⃣ Open the Frontend
Simply open public/index.html in a browser (or access via server at http://localhost:5000).