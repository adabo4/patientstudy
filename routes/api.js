// backend/routes/api.js

const express = require('express');
const router = express.Router();
const PatientTest = require('../models/patient');


router.get('/', async (req, res) => {
    try {
        const patients = await PatientTest.find();
        res.json(patients);
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


router.post('/', async (req, res) => {
    try {
        const patient = await PatientTest.create(req.body);
        res.json(patient);
    } catch (error) {
        console.error('Error creating patient:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedPatient = await PatientTest.findByIdAndUpdate(id, updatedData, {
            new: true,
        });

        res.json(updatedPatient);
    } catch (error) {
        console.error('Error updating patient:', error);
        res.status(500).json({ error: 'Failed to update patient' });
    }
});

router.put('/patients/:patientId/toggle-check', async (req, res) => {
    const { patientId } = req.params;

    try {
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Toggle the checked status
        patient.checked = !patient.checked;
        res.send(patient.checked)


        // Save the updated patient to the database
        await patient.save();

        res.json(patient);
        console.log(patient.checked)

    } catch (error) {
        console.error('Error toggling patient checked status:', error);
        res.status(500).json({ message: 'Server error' });
    }
});





router.delete('/:id', async (req, res) => {
    try {
        const patientId = req.params.id;
        const deletedPatient = await PatientTest.findByIdAndRemove(patientId);

        if (!deletedPatient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.json({ message: 'Patient deleted successfully' });
    } catch (error) {
        console.error('Error deleting patient:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;
