const db = require("../config/db");

// Import models
const User = require("./User");
const Clinic = require("./Clinic");
const Patient = require("./Patient");
const Insurance = require("./Insurance");
const Appointment = require("./Appointment");
const Pharmacy = require("./Pharmacy");
const Prescription = require("./Prescription");
const PrescriptionItem = require("./PrescriptionItem");
const Invoice = require("./Invoice");
const InvoiceItem = require("./InvoiceItem");

// Define relations

// Clinics and users (One-to-Many)
Clinic.hasMany(User, { foreignKey: "clinic_id", as: "users" });
User.belongsTo(Clinic, { foreignKey: "clinic_id", as: "clinic" });

// Clinics and Patients (One-to-Many)
Clinic.hasMany(Patient, { foreignKey: "clinic_id", as: "patients" });
Patient.belongsTo(Clinic, { foreignKey: "clinic_id", as: "clinic" });

// Patients and Insurance (Many-to-One)
Insurance.hasMany(Patient, { foreignKey: "insurance_id", as: "patients" });
Patient.belongsTo(Insurance, { foreignKey: "insurance_id", as: "insurance" });

// Clinics and Appointments (One-to-Many)
Clinic.hasMany(Appointment, { foreignKey: "clinic_id", as: "appointments" });
Appointment.belongsTo(Clinic, { foreignKey: "clinic_id", as: "clinic" });

// Patients and Appointments (One-to-Many)
Patient.hasMany(Appointment, { foreignKey: "patient_id", as: "appointments" });
Appointment.belongsTo(Patient, { foreignKey: "patient_id", as: "patient" });

// Users (Doctors) and Appointments (One-to-Many)
User.hasMany(Appointment, { foreignKey: "doctor_id", as: "appointments" });
Appointment.belongsTo(User, { foreignKey: "doctor_id", as: "doctor" });

// Clinics and Pharmacy (One-to-Many)
Clinic.hasMany(Pharmacy, { foreignKey: "clinic_id", as: "pharmacy_items" });
Pharmacy.belongsTo(Clinic, { foreignKey: "clinic_id", as: "clinic" });

// Prescriptions and Patients (One-to-Many)
Patient.hasMany(Prescription, {
  foreignKey: "patient_id",
  as: "prescriptions",
});
Prescription.belongsTo(Patient, { foreignKey: "patient_id", as: "patient" });

// Users (Doctors) and Prescriptions (One-to-Many)
User.hasMany(Prescription, { foreignKey: "doctor_id", as: "prescriptions" });
Prescription.belongsTo(User, { foreignKey: "doctor_id", as: "doctor" });

// Prescriptions and Prescription Items (One-to-Many)
Prescription.hasMany(PrescriptionItem, {
  foreignKey: "prescription_id",
  as: "items",
});
PrescriptionItem.belongsTo(Prescription, {
  foreignKey: "prescription_id",
  as: "prescription",
});

// Pharmacy and Prescription Items (One-to-Many)
Pharmacy.hasMany(PrescriptionItem, {
  foreignKey: "pharmacy_id",
  as: "prescription_items",
});
PrescriptionItem.belongsTo(Pharmacy, {
  foreignKey: "pharmacy_id",
  as: "pharmacy",
});

// Clinics and Invoices (One-to-Many)
Clinic.hasMany(Invoice, { foreignKey: "clinic_id", as: "invoices" });
Invoice.belongsTo(Clinic, { foreignKey: "clinic_id", as: "clinic" });

// Patients and Invoices (One-to-Many)
Patient.hasMany(Invoice, { foreignKey: "patient_id", as: "invoices" });
Invoice.belongsTo(Patient, { foreignKey: "patient_id", as: "patient" });

// Invoices and Invoice Items (One-to-Many)
Invoice.hasMany(InvoiceItem, { foreignKey: "invoice_id", as: "items" });
InvoiceItem.belongsTo(Invoice, { foreignKey: "invoice_id", as: "invoice" });

// Exporter les modèles et db
module.exports = {
  db,
  Clinic,
  User,
  Patient,
  Insurance,
  Appointment,
  Pharmacy,
  Prescription,
  PrescriptionItem,
  Invoice,
  InvoiceItem,
};
