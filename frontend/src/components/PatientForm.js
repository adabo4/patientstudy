import React, { useState, useEffect } from 'react';
import axios from "axios"
import PatientList from './PatientList';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import "./PatientForm.css"


function PatientForm() {

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        birth_number: '',
        drug_name: '',
        dosage: '',
        lot_number: '',
        expiration_date: '',
        count: '',
    });

    const [patients, setPatients] = useState([]);

    const navigate = useNavigate();



    useEffect(() => {
        // Fetch patient data from the server when the component mounts
        axios.get('/patients')
            .then((response) => {
                setPatients(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.error('Error fetching patients:', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/patients', formData);

            // Fetch the updated patient list after creating a new patient
            axios.get('/patients')
                .then((response) => {
                    setPatients(response.data);
                    console.log(response.data)
                })
                .catch((error) => {
                    console.error('Error fetching patients:', error);
                });

            setFormData({
                first_name: '',
                last_name: '',
                birth_number: '',
                drug_name: '',
                dosage: '',
                lot_number: '',
                expiration_date: '',
                count: '',
            });
        } catch (error) {
            console.error('Error creating patient:', error);
        }
        navigate("/home");
    }




    const handleDelete = (patientId) => {
        // Send a DELETE request to delete the patient by ID
        axios.delete(`/patients/${patientId}`)
            .then((response) => {
                console.log(response.data);
                // Remove the deleted patient from the local state
                setPatients(patients.filter((patient) => patient._id !== patientId));
            })
            .catch((error) => {
                console.error('Error deleting patient:', error);
            });
    };


    return (
        <>
            <div className="background">
                <Navbar />

                <div className='container'>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Meno:
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
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
                        <button type="submit">Pridaj pacienta</button>

                    </form>

                </div>

                <div>
                    {new Date().getFullYear()}
                </div>

            </div>
        </>
    );
}

export default PatientForm;
