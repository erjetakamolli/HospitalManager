import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPatientById, updatePatient } from "../api";
import Navbar from "./Navbar";
import "../styles/UpdatePatient.css";

const UpdatePatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", age: "", symptoms: "" });
  const [patientName, setPatientName] = useState("");

  useEffect(() => {
    getPatientById(id)
      .then(res => {
        setFormData(res.data);
        setPatientName(res.data.name);
      })
      .catch(err => console.error("Error fetching patient data:", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePatient(id, formData)
      .then(() => navigate(`/patients/${id}/details`))
      .catch(err => console.error("Error updating patient:", err));
  };

  return (
    <div className="page-wrapper">
      <Navbar homeLink="/" title={`Update ${patientName}`} />
      <div className="update-patient-container">
        <h2>Update {patientName}</h2>
        <form onSubmit={handleSubmit} className="update-form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Symptoms</label>
            <textarea name="symptoms" value={formData.symptoms} onChange={handleChange} required />
          </div>

          <button type="submit" className="submit-button">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePatient;

