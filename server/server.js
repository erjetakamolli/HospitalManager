const express = require("express");
const cors = require("cors"); 

const app = express();
require("dotenv").config();
require("./config/mongoose.config");

app.use(cors()); 
app.use(express.json(), express.urlencoded({ extended: true }));

const patientRoutes = require("./routes/patient.routes");
patientRoutes(app);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
