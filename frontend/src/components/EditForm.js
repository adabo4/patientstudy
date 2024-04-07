// EditPatient.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./EditForm.css"


function EditForm({ fetchAllPatients, patients, setPatients, patientId, onClose }) {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        first_name: patients.first_name,
        last_name: patients.last_name,
        birth_number: patients.birth_number,
        drug_name: patients.drug_name,
        dosage: patients.dosage,
        lot_number: patients.lot_number,
        expiration_date: patients.expiration_date,
        count: patients.count
    });

    useEffect(() => {
        // Fetch the patient's data when the component mounts
        axios
            .get(`/patients`)
            .then((response) => {
                const patientData = response.data;
                setFormData(patientData);
            })
            .catch((error) => {
                console.error('Error fetching patient data:', error);
            });
    }, [patientId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCancel = () => {
        // Close the edit form without making any changes
        onClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a PUT request to update the patient's data
            await axios.put(`/patients/${patientId}`, formData);

            // Refresh the patient data in the Home component
            axios.get('/patients')
                .then((response) => {
                    setPatients(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching patients:', error);
                });

            onClose();
        } catch (error) {
            console.error('Error updating patient:', error);

        }
        navigate("/home")
        fetchAllPatients()

    };

    return (
        <div className='form-container'>
            <h2>Zmeň údaje:</h2>
            <form onSubmit={handleSubmit}>

                <label>
                    Meno:
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name || ''}
                        onChange={handleChange}

                    />
                </label>
                <label>
                    Priezvisko:
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Rodné číslo:
                    <input
                        type="text"
                        name="birth_number"
                        value={formData.birth_number}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Liek:
                    <input
                        type="text"
                        name="drug_name"
                        value={formData.drug_name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Dávka:
                    <input
                        type="text"
                        name="dosage"
                        value={formData.dosage}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Šarža:
                    <input
                        type="text"
                        name="lot_number"
                        value={formData.lot_number}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Exspirácia:
                    <input
                        type="text"
                        name="expiration_date"
                        value={formData.expiration_date}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Počet ks:
                    <input
                        type="text"
                        name="count"
                        value={formData.count}
                        onChange={handleChange}
                    />
                </label>

                <button type="submit">Uložiť</button>
                <button type="button" onClick={handleCancel}>Späť</button>
            </form>
        </div>
    );
}

export default EditForm;
