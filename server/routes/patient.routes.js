const PatientController = require('../controllers/patient.controller');

module.exports = app => {
  app.post("/api/patients", PatientController.createPatient);
  app.get("/api/patients", PatientController.getAllPatients);
  app.get("/api/patients/children", PatientController.getChildPatients);
  app.get("/api/patients/adults", PatientController.getAdultPatients);
  app.get("/api/patients/:id", PatientController.getPatientById);
  app.put("/api/patients/:id", PatientController.updatePatient);
  app.delete("/api/patients/:id", PatientController.deletePatient);
};
