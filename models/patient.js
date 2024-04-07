// backend/models/patient.js

const mongoose = require('mongoose');

const patientTestSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    first_name: String,
    last_name: String,
    birth_number: String,
    drug_name: String,
    lot_number: String,
    expiration_date: String,
    dosage: String,
    count: String,
    checked: Boolean
});

const PatientTest = mongoose.model('PatientTest', patientTestSchema);

module.exports = PatientTest;
