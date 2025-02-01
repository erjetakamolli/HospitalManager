import PropTypes from 'prop-types'; 
import { useState, useEffect } from "react";
import { getAllPatients } from "../api";
import { PatientContext } from "./PatientContext";

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    try {
      const { data } = await getAllPatients();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <PatientContext.Provider value={{ patients, setPatients, fetchPatients }}>
      {children}
    </PatientContext.Provider>
  );
};

PatientProvider.propTypes = {
  children: PropTypes.node.isRequired,
};