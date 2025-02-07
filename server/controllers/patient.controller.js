const mongoose = require('mongoose');
const Patient = require("../models/patient.model");

class ValidationError extends Error {
  constructor(errors) {
    super("Validation Error");
    this.name = "ValidationError";
    this.errors = errors;
  }
}

module.exports.createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: "Validation Error", errors: err.errors });
    }
    res.status(400).json(err); 
  }
};

module.exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.json(patient);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.json(updatedPatient);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: "Validation Error", errors: err.errors });
    }
    res.status(400).json(err);
  }
};

module.exports.deletePatient = async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.json({ message: "Patient removed successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getChildPatients = async (req, res) => {
  try {
    const childPatients = await Patient.find({ age: { $lte: 17 } });
    res.json(childPatients);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getAdultPatients = async (req, res) => {
  try {
    const adultPatients = await Patient.find({ age: { $gte: 18 } });
    res.json(adultPatients);
  } catch (err) {
    res.status(500).json(err);
  }
};


