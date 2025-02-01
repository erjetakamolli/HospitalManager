import axios from "axios";

const API_URL = "http://localhost:8000/api/patients"; 

export const getAllPatients = () => axios.get(API_URL);
export const getChildPatients = () => axios.get(`${API_URL}/children`);
export const getAdultPatients = () => axios.get(`${API_URL}/adults`);
export const getPatientById = (id) => axios.get(`${API_URL}/${id}`);
export const createPatient = (data) => axios.post(API_URL, data);
export const updatePatient = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deletePatient = (id) => axios.delete(`${API_URL}/${id}`);