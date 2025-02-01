import { useState, useEffect } from "react";
import { createPatient } from "../api";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import "../styles/AddPatient.css";

const AddPatient = () => {
  const [form, setForm] = useState({ name: "", age: "", symptoms: "", parentalConsent: false });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let tempErrors = {};
    if (form.name.length < 1) tempErrors.name = "A patient's name is required!";
    if (form.age < 1 || form.age > 140) tempErrors.age = "A patient's age is required!";
    if (form.age < 18 && !form.parentalConsent) tempErrors.parentalConsent = "Parental consent is required!";
    if (form.symptoms.length < 4) tempErrors.symptoms = "A patient's symptoms is required!";
    setErrors(tempErrors);
  }, [form]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        await createPatient(form);
        setSuccess("Patient added successfully!");
        setForm({ name: "", age: "", symptoms: "", parentalConsent: false });
        navigate("/patients");
      } catch (error) {
        console.error("Error creating patient:", error);
        setErrors({ api: "Failed to add patient. Try again." });
      }
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar homeLink="/patients" title="Admit Patient" />

      <div className="add-patient-container">
        {success && <p className="success-message">{success}</p>}
        {errors.api && <p className="error-message">{errors.api}</p>}
        <form onSubmit={handleSubmit} className="patient-form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label>Age</label>
            <input type="number" name="age" value={form.age} onChange={handleChange} />
            {errors.age && <p className="error-message">{errors.age}</p>}
          </div>

          <div className="form-group">
            <label>Symptoms</label>
            <input type="text" name="symptoms" value={form.symptoms} onChange={handleChange} />
            {errors.symptoms && <p className="error-message">{errors.symptoms}</p>}
          </div>

          {form.age < 18 && (
            <div className="form-group checkbox-group">
              <label>
                <input type="checkbox" name="parentalConsent" checked={form.parentalConsent} onChange={handleChange} />
                Parental Consent
              </label>
              {errors.parentalConsent && <p className="error-message">{errors.parentalConsent}</p>}
            </div>
          )}

          <button type="submit" className="submit-button">Admit</button>
        </form>
      </div>
    </div>
  );
};

export default AddPatient;

