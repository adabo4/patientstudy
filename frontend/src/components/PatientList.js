import React, { useState } from "react";
import "./PatientList.css";
import { FaRegRectangleXmark } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  AiOutlineEdit,
  AiFillCheckSquare,
  AiOutlineCheckSquare,
} from "react-icons/ai";
import EditForm from "./EditForm";
import { HashLink } from "react-router-hash-link";
import axios from "axios";

function PatientList({
  fetchAllPatients,
  searchResultMessage,
  patients,
  setPatients,
  handleDelete,
}) {
  const [editingPatientId, setEditingPatientId] = useState(null);

  const handleEdit = (patientId) => {
    console.log("Editing patient with ID:", patientId);
    setEditingPatientId(patientId);
  };
  const handleCloseEditForm = () => {
    setEditingPatientId(null);
  };

  const handleCheckToggle = async (patientId) => {
    // Find the patient by ID
    const updatedPatients = patients.map((patient) => {
      if (patient._id === patientId) {
        // Toggle the checked status
        patient.checked = !patient.checked;

        // Update the checked status in the backend
        axios
          .put(`/patients/${patient._id}`, { checked: patient.checked })
          .then((response) => {
            // Handle the response if needed
          })
          .catch((error) => {
            console.error("Error toggling patient checked status:", error);
          });
      }
      return patient;
    });

    // Update the state with the modified patient list
    setPatients(updatedPatients);
  };

  return (
    <>
      <div className="patient-container">
        <h2>Zoznam pacientov</h2>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Dátum a čas</th>
                <th>Meno</th>
                <th>Priezvisko</th>
                <th>Rodné číslo</th>
                <th>Liek</th>
                <th>Dávka</th>
                <th>Šarža</th>
                <th>Exspirácia</th>
                <th>Počet</th>
                <th>Upraviť</th>
                <th>Vymazať</th>
                <th>Odpísať</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr
                  key={patient._id}
                  className={patient.checked ? "highlighted" : ""}
                >
                  {patient.date && (
                    <td>
                      {patient.date.split("T")[0]} {patient.date.slice(11, 19)}
                    </td>
                  )}

                  <td>{patient.first_name}</td>
                  <td>{patient.last_name}</td>
                  <td>{patient.birth_number}</td>
                  <td>{patient.drug_name}</td>
                  <td>{patient.dosage}</td>
                  <td>{patient.lot_number}</td>
                  <td>{patient.expiration_date}</td>
                  <td>{patient.count}</td>

                  <td>
                    <HashLink smooth to="/home#cont">
                      <button onClick={() => handleEdit(patient._id)}>
                        <AiOutlineEdit className="icon" />
                      </button>
                    </HashLink>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(patient._id)}>
                      <FaRegRectangleXmark className="icon" />
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleCheckToggle(patient._id)}>
                      {patient.checked ? (
                        <AiFillCheckSquare className="icon" />
                      ) : (
                        <AiOutlineCheckSquare className="icon" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {searchResultMessage && <p className="error">{searchResultMessage}</p>}

      {editingPatientId && (
        <div className="container" id="cont">
          <EditForm
            fetchAllPatients={fetchAllPatients}
            setPatients={setPatients}
            patients={patients}
            patientId={editingPatientId}
            onClose={handleCloseEditForm}
          />
        </div>
      )}
    </>
  );
}

export default PatientList;
