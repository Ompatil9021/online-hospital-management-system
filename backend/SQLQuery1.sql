create database NewHMS;
use NewHMS;

CREATE TABLE Patients (
    PatientID INT PRIMARY KEY,
    Name VARCHAR(100),
    Age INT,
    Gender VARCHAR(10),
    Contact VARCHAR(15),
    RoomNo INT,
    Address VARCHAR(255)
);

CREATE TABLE MedicalHistory (
    HistoryID INT PRIMARY KEY,
    PatientID INT FOREIGN KEY REFERENCES Patients(PatientID),
    Disease VARCHAR(100),
    Symptoms TEXT,
    DiagnosisDate DATE,
    RecoveryStatus VARCHAR(50)
);


CREATE TABLE Doctors (
    DoctorID INT PRIMARY KEY,
    Name VARCHAR(100),
    Specialization VARCHAR(100),
    Contact VARCHAR(15)
);


CREATE TABLE Consultations (
    ConsultationID INT PRIMARY KEY,
    PatientID INT FOREIGN KEY REFERENCES Patients(PatientID),
    DoctorID INT FOREIGN KEY REFERENCES Doctors(DoctorID),
    ConsultationDate DATE,
    FollowUpDate DATE,
    Disease VARCHAR(100)
);


CREATE TABLE OnlineConsultancy (
    ConsultancyID INT PRIMARY KEY,
    PatientID INT FOREIGN KEY REFERENCES Patients(PatientID),
    Disease VARCHAR(100),
    DoctorID INT FOREIGN KEY REFERENCES Doctors(DoctorID),
    Date DATE,
    Remarks TEXT
);


CREATE TABLE DietPlans (
    DietID INT PRIMARY KEY,
    Disease VARCHAR(100),
    DietDescription TEXT
);


CREATE TABLE Billing (
    BillID INT PRIMARY KEY,
    PatientID INT FOREIGN KEY REFERENCES Patients(PatientID),
    Amount DECIMAL(10,2),
    Date DATE,
    PaymentStatus VARCHAR(20)
);

CREATE TABLE Billing (
    BillID INT PRIMARY KEY IDENTITY,
    PatientID INT,
    Amount DECIMAL(10, 2),
    Date DATE DEFAULT GETDATE(),
    Description VARCHAR(255),
    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID)
);



CREATE TABLE Rooms (
    RoomID INT PRIMARY KEY IDENTITY(1,1),
    RoomNumber VARCHAR(10) NOT NULL,
    Type VARCHAR(50), -- e.g., ICU, General, Private
    Status VARCHAR(20) DEFAULT 'Available' -- Available, Occupied, Maintenance
);

CREATE TABLE PatientRoomAssignments (
    AssignmentID INT PRIMARY KEY IDENTITY(1,1),
    PatientID INT FOREIGN KEY REFERENCES Patients(PatientID),
    RoomID INT FOREIGN KEY REFERENCES Rooms(RoomID),
    AssignedDate DATE DEFAULT GETDATE()
);


CREATE TABLE Admins (
  AdminID INT IDENTITY PRIMARY KEY,
  Username VARCHAR(50) NOT NULL UNIQUE,
  Password VARCHAR(100) NOT NULL -- (hashed password ideally)
);

-- Insert default admin
INSERT INTO Admins (Username, Password)
VALUES ('admin', 'admin123'); -- Later, replace with hashed password

SELECT * FROM Patients ORDER BY PatientID DESC;



-- Find foreign keys referencing Patients table
SELECT f.name AS ForeignKey,
       OBJECT_NAME(f.parent_object_id) AS TableName
FROM sys.foreign_keys AS f
WHERE f.referenced_object_id = OBJECT_ID('Patients');


SELECT 
  fk.name AS ForeignKeyName,
  OBJECT_NAME(fk.parent_object_id) AS TableWithForeignKey,
  col1.name AS FK_Column,
  OBJECT_NAME(fk.referenced_object_id) AS ReferencedTable,
  col2.name AS PK_Column
FROM 
  sys.foreign_keys fk
  INNER JOIN sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id
  INNER JOIN sys.columns col1 ON fkc.parent_column_id = col1.column_id AND fkc.parent_object_id = col1.object_id
  INNER JOIN sys.columns col2 ON fkc.referenced_column_id = col2.column_id AND fkc.referenced_object_id = col2.object_id
WHERE 
  fk.referenced_object_id = OBJECT_ID('Patients');

DROP TABLE Patients;

CREATE TABLE Patients (
    PatientID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100),
    Age INT,
    Gender NVARCHAR(10),
    Phone NVARCHAR(20),
    Email NVARCHAR(100)
);

SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Patients';

DROP TABLE Patients;


CREATE TABLE Patients (
    PatientID INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(100),
    Age INT,
    Gender VARCHAR(10),
    Contact VARCHAR(15),
    RoomNo INT,
    Address VARCHAR(255)
);

SELECT * FROM Doctors;

INSERT INTO Doctors (Name, Specialization, Contact)
VALUES ('Dr. Om Patil', 'Cardiology', '9876543210');


DROP TABLE IF EXISTS Doctors;

CREATE TABLE Doctors (
  DoctorID INT IDENTITY(1,1) PRIMARY KEY,
  Name VARCHAR(100),
  Specialization VARCHAR(100),
  Contact VARCHAR(20)
);

ALTER TABLE Consultations DROP CONSTRAINT FK__Consultat__Docto__5165187F;
ALTER TABLE OnlineConsultancy DROP CONSTRAINT FK__OnlineCon__Docto__5535A963;

DROP TABLE Doctors;

CREATE TABLE Doctors (
  DoctorID INT IDENTITY(1,1) PRIMARY KEY,
  Name VARCHAR(100),
  Specialization VARCHAR(100),
  Contact VARCHAR(20)
);

INSERT INTO Doctors (Name, Specialization, Contact)
VALUES
  ('Dr. Om Patil', 'Cardiology', '9876543210'),
  ('Dr. Asha Mehta', 'Neurology', '9000011111'),
  ('Dr. Suresh Rao', 'Dermatology', '9022245678');

  SELECT * FROM Doctors ORDER BY DoctorID DESC;


  SELECT * FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'DietDescription';


  INSERT INTO DietPlans (Disease, DietDescription)
VALUES ('Diabetes', 'Eat high-fiber foods, avoid sugar, take insulin on time.');


DROP TABLE IF EXISTS DietPlans;

CREATE TABLE DietPlans (
  DietID INT IDENTITY(1,1) PRIMARY KEY,
  Disease VARCHAR(100),
  DietDescription TEXT
);

INSERT INTO DietPlans (Disease, DietDescription)
VALUES ('Diabetes', 'Avoid sugar. Eat high-fiber meals. Stay hydrated.');


INSERT INTO DietPlans (Disease, DietDescription)
VALUES ('Blood Pressure', 'Eat bananas, spinach, and other vegetables Drink low-fat milk and eat brown rice or roti Don’t eat too much salt, chips, or junk food.');

INSERT INTO DietPlans (Disease, DietDescription)
VALUES ('Heart Disease', 'Eat oats, nuts, and fish Add green vegetables and fruits like berries Don’t eat red meat or oily, salty food.');

INSERT INTO DietPlans (Disease, DietDescription)
VALUES ('Anemia', 'Eat spinach, jaggery, meat, and beans Drink orange juice (helps absorb iron) Avoid tea or coffee with meals .');

INSERT INTO DietPlans (Disease, DietDescription)
VALUES ('Acidity', 'Eat boiled vegetables, bananas, oats Have curd and drink herbal tea Don’t eat spicy food, fried items, or drink coffee .');

INSERT INTO DietPlans (Disease, DietDescription)
VALUES ('Kidney', 'Eat less salt and less protein Drink enough water Avoid bananas, potatoes, and too much milk.');

INSERT INTO DietPlans (Disease, DietDescription)
VALUES ('Liver', 'Eat green vegetables, fruits, and oats Use less oil and sugar Don’t drink alcohol or eat junk food

.');

INSERT INTO DietPlans (Disease, DietDescription)
VALUES ('Thyroid', 'Use iodized salt Eat eggs, milk, nuts, and fish Don’t eat raw cabbage or broccoli often  .');

INSERT INTO DietPlans (Disease, DietDescription)
VALUES ('Osteoporosis', 'Drink milk and eat curd and cheese Sit in sunlight for Vitamin D Eat almonds, leafy greens, and fish Avoid too much tea or coffee.');











CREATE TABLE Rooms (
  RoomID INT IDENTITY(1,1) PRIMARY KEY,
  RoomNumber VARCHAR(20),
  Type VARCHAR(50),
  Status VARCHAR(50)
);


DROP TABLE IF EXISTS Billing;

CREATE TABLE Billing (
  BillID INT IDENTITY(1,1) PRIMARY KEY,
  PatientID INT FOREIGN KEY REFERENCES Patients(PatientID),
  Amount DECIMAL(10, 2),
  PaymentStatus VARCHAR(20),
  Date DATE
);

INSERT INTO Billing (PatientID, Amount, PaymentStatus, Date)
VALUES (1, 500.00, 'Paid', GETDATE());


ALTER TABLE MedicalHistory
ADD Notes VARCHAR(255) NULL;

ALTER TABLE MedicalHistory
ADD Condition VARCHAR(100),
    Notes VARCHAR(255);

	ALTER TABLE MedicalHistory
ADD Condition VARCHAR(100);


DROP TABLE MedicalHistory;

CREATE TABLE MedicalHistory (
  HistoryID INT IDENTITY(1,1) PRIMARY KEY,
  PatientID INT NOT NULL,
  Condition VARCHAR(100),
  DiagnosisDate DATE,
  Notes VARCHAR(255)
);


INSERT INTO Doctors (Name, Specialization, Contact)
VALUES ('Dr. A. Sharma', 'Diabetes', 'dr.sharma@example.com');


ALTER TABLE Doctors ALTER COLUMN Contact NVARCHAR(100);

-- Query for Blood Pressure
INSERT INTO Doctors (Name, Specialization, Contact)
VALUES ('Dr. B. Verma', 'Blood Pressure', 'dr.verma@healthcare.net');

-- Query for Heart Disease
INSERT INTO Doctors (Name, Specialization, Contact)
VALUES ('Dr. C. Joshi', 'Heart Disease', 'dr.joshi@medicalcenter.org');

-- Query for Anemia
INSERT INTO Doctors (Name, Specialization, Contact)
VALUES ('Dr. D. Singh', 'Anemia', 'dr.singh@healthfirst.com');

-- Query for Acidity
INSERT INTO Doctors (Name, Specialization, Contact)
VALUES ('Dr. E. Gupta', 'Acidity', 'dr.gupta@wellnessclinic.in');

-- Query for Kidney
INSERT INTO Doctors (Name, Specialization, Contact)
VALUES ('Dr. F. Khan', 'Kidney', 'dr.khan@nephrocare.com');

-- Query for Liver
INSERT INTO Doctors (Name, Specialization, Contact)
VALUES ('Dr. G. Reddy', 'Liver', 'dr.reddy@liverinstitute.org');

-- Query for Thyroid
INSERT INTO Doctors (Name, Specialization, Contact)
VALUES ('Dr. H. Patel', 'Thyroid', 'dr.patel@endohealth.com');

-- Query for Osteoporosis
INSERT INTO Doctors (Name, Specialization, Contact)
VALUES ('Dr. I. Kumar', 'Osteoporosis', 'dr.kumar@boneandjoint.net');

CREATE VIEW PatientRoomView AS
SELECT P.PatientID, P.Name, R.RoomNumber, R.Type, R.Status
FROM Patients P
JOIN Rooms R ON P.RoomNo = R.RoomNumber;

ALTER TABLE Patients ADD Discharged BIT DEFAULT 0;
SELECT * FROM Patients WHERE Discharged = 0

ALTER TABLE Patients ADD Discharged BIT DEFAULT 0;

select* from Patients

SELECT TOP 1 Discharged FROM Patients;

SELECT * FROM Patients ORDER BY PatientID DESC;

select * from Patients

UPDATE Patients SET Discharged = 0 WHERE Discharged IS NULL;


SELECT TOP 5 * FROM Consultations;
SELECT TOP 5 * FROM Doctors;



