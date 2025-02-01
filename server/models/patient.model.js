const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Patient name is required"],
      minlength: [1, "Patient name must be at least 1 character long"],
      maxlength: [40, "Patient name must be no more than 40 characters long"],
    },
    age: {
      type: Number,
      required: [true, "Patient age is required"],
      min: [1, "Patient age must be at least 1"],
      max: [140, "Patient age must be no more than 140"],
      validate: {
        validator: function (value) {
          return value >= 18 || this.parentalConsent; 
        },
        message: "Parental consent is required for patients under 18",
      },
    },
    parentalConsent: {
      type: Boolean,
      required: function () {
        return this.age < 18;
      },
    },
    symptoms: {
      type: String,
      required: [true, "Symptoms are required"],
      minlength: [4, "Symptoms must be at least 4 characters long"],
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", PatientSchema);
module.exports = Patient;
