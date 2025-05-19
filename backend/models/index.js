const db = require("../config/db");

// Import models
const Clinic = require("./Clinic");
const User = require("./User");
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
Clinic.hasMany(User, { foreignKey: "clinicId", as: "users" });
User.belongsTo(Clinic, { foreignKey: "clinicId", as: "clinic" });

// Clinics and Patients (One-to-Many)
Clinic.hasMany(Patient, { foreignKey: "clinicId", as: "patients" });
Patient.belongsTo(Clinic, { foreignKey: "clinicId", as: "clinic" });

// Patients and Insurance (Many-to-One)
Insurance.hasMany(Patient, { foreignKey: "insuranceId", as: "patients" });
Patient.belongsTo(Insurance, { foreignKey: "insuranceId", as: "insurance" });

// Clinics and Appointments (One-to-Many)
Clinic.hasMany(Appointment, { foreignKey: "clinicId", as: "appointments" });
Appointment.belongsTo(Clinic, { foreignKey: "clinicId", as: "clinic" });

// Patients and Appointments (One-to-Many)
Patient.hasMany(Appointment, { foreignKey: "patientId", as: "appointments" });
Appointment.belongsTo(Patient, { foreignKey: "patientId", as: "patient" });

// Users (Doctors) and Appointments (One-to-Many)
User.hasMany(Appointment, { foreignKey: "doctorId", as: "appointments" });
Appointment.belongsTo(User, { foreignKey: "doctorId", as: "doctor" });

// Clinics and Pharmacy (One-to-Many)
Clinic.hasMany(Pharmacy, { foreignKey: "clinicId", as: "pharmacyItems" });
Pharmacy.belongsTo(Clinic, { foreignKey: "clinicId", as: "clinic" });

// Prescriptions and Patients (One-to-Many)
Patient.hasMany(Prescription, {
  foreignKey: "patientId",
  as: "prescriptions",
});
Prescription.belongsTo(Patient, { foreignKey: "patientId", as: "patient" });

// Users (Doctors) and Prescriptions (One-to-Many)
User.hasMany(Prescription, { foreignKey: "doctorId", as: "prescriptions" });
Prescription.belongsTo(User, { foreignKey: "doctorId", as: "doctor" });

// Prescriptions and Prescription Items (One-to-Many)
Prescription.hasMany(PrescriptionItem, {
  foreignKey: "prescriptionId",
  as: "items",
});
PrescriptionItem.belongsTo(Prescription, {
  foreignKey: "prescriptionId",
  as: "prescription",
});

// Pharmacy and Prescription Items (One-to-Many)
Pharmacy.hasMany(PrescriptionItem, {
  foreignKey: "pharmacyId",
  as: "prescriptionItems",
});
PrescriptionItem.belongsTo(Pharmacy, {
  foreignKey: "pharmacyId",
  as: "pharmacy",
});

// Clinics and Invoices (One-to-Many)
Clinic.hasMany(Invoice, { foreignKey: "clinicId", as: "invoices" });
Invoice.belongsTo(Clinic, { foreignKey: "clinicId", as: "clinic" });

// Patients and Invoices (One-to-Many)
Patient.hasMany(Invoice, { foreignKey: "patientId", as: "invoices" });
Invoice.belongsTo(Patient, { foreignKey: "patientId", as: "patient" });

// Invoices and Invoice Items (One-to-Many)
Invoice.hasMany(InvoiceItem, { foreignKey: "invoiceId", as: "items" });
InvoiceItem.belongsTo(Invoice, { foreignKey: "invoiceId", as: "invoice" });

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
