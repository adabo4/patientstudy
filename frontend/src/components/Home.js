
import React, { useState, useEffect } from 'react';
import axios from "axios"
import PatientList from './PatientList';
import Navbar from './Navbar';
import SearchBar from './SearchBar';

export default function Home() {
    const [patients, setPatients] = useState([]);
    const [allPatients, setAllPatients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResultMessage, setSearchResultMessage] = useState('');

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

    useEffect(() => {
        // Fetch all patient data from the server when the component mounts
        axios.get('/patients')
            .then((response) => {
                const patientData = response.data;
                setAllPatients(patientData);
                setPatients(patientData);
            })
            .catch((error) => {
                console.error('Error fetching patients:', error);
            });
    }, []);

    const fetchAllPatients = () => {
        // Fetch all patient data from the server when the component mounts
        axios.get('/patients')
            .then((response) => {
                const patientData = response.data;
                setAllPatients(patientData);
                setPatients(patientData);
            })
            .catch((error) => {
                console.error('Error fetching patients:', error);
            });
        setSearchResultMessage('')
    }



    const handleSearch = () => {
        const queryLowerCase = searchQuery.toLowerCase();
        const filteredPatients = allPatients.filter((patient) => {
            const patientData = Object.values(patient);

            return patientData.some((field) => {
                if (field && typeof field === 'string') {
                    return field.toLowerCase().includes(queryLowerCase);
                }
                return false;
            });
        });



        if (filteredPatients.length === 0) {
            setSearchResultMessage('Pacient s danými údajmi neexistuje.');
        } else {
            setSearchResultMessage('');
        }

        setPatients(filteredPatients);
        setSearchQuery('');

    };


    return (
        <>
            <div className="background">
                {patients && <Navbar fetchAllPatients={fetchAllPatients} searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />}

                {patients && <PatientList
                    fetchAllPatients={fetchAllPatients}
                    searchResultMessage={searchResultMessage}
                    setSearchResultMessage={setSearchResultMessage} searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} setPatients={setPatients} patients={patients} handleDelete={handleDelete} />}

                {new Date().getFullYear()}
            </div>

        </>
    )
}
