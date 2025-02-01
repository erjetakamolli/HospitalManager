import { useEffect, useState } from "react";
import { getChildPatients, getAdultPatients, getAllPatients, deletePatient } from "../api";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/PatientList.css";

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    try {
      const { data } = await getAllPatients();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleFilterChildren = async () => {
    try {
      const { data } = await getChildPatients();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching child patients:", error);
    }
  };

  const handleFilterAdults = async () => {
    try {
      const { data } = await getAdultPatients();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching adult patients:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePatient(id);
      setPatients(patients.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Failed to delete patient", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="page-wrapper">
      <Navbar homeLink="/" title="Hospital Manager" />

      <div className="patient-list-container">
        <div className="filter-buttons">
          <button onClick={handleFilterChildren}>Show Children</button>
          <button onClick={handleFilterAdults}>Show Adults</button>
          <button onClick={fetchPatients}>Show All</button>
        </div>
        <ul className="patient-list">
          {patients.map((patient) => (
            <li key={patient._id} className="patient-item">
              <div className="patient-info">
                <Link to={`/patients/${patient._id}/details`} className="patient-link">{patient.name}</Link> (Age: {patient.age}) - {patient.symptoms}
              </div>
              <div className="patient-actions">
                <Link to={`/patients/${patient._id}/edit`}><button className="edit-button">Edit</button></Link>
                <button onClick={() => handleDelete(patient._id)} className="delete-button">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PatientList;
