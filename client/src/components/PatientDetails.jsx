import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPatientById, deletePatient } from "../api";
import Navbar from "./Navbar";
import "../styles/PatientDetails.css";
import BabyIcon from "@mui/icons-material/ChildCare"; 
import ElderlyIcon from "@mui/icons-material/Elderly"; 

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    getPatientById(id)
      .then(res => setPatient(res.data))
      .catch(err => console.error("Error fetching patient details:", err));
  }, [id]);

  const handleDelete = () => {
    deletePatient(id)
      .then(() => navigate("/patients"))
      .catch(err => console.error("Error deleting patient:", err));
  };

  if (!patient) return <p>Loading...</p>;

  return (
    <div className="page-wrapper">
      <Navbar homeLink="/" title={`${patient.name} Details`} />
      <div className="patient-details-container">
        <h2>{patient.name}</h2>
        <p>{patient.age} years of age.</p>
        {patient.age < 3 && (
          <BabyIcon className="age-icon" />
        )}
        {patient.age > 75 && (
          <ElderlyIcon className="age-icon" />
        )}
        <p>Symptoms: {patient.symptoms}</p>
        <button onClick={handleDelete} className="delete-button">Discharge Patient</button>
      </div>
    </div>
  );
};

export default PatientDetails;

