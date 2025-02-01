import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PatientProvider } from "./context/PatientProvider"; 
import HomePage from "./pages/HomePage";
import PatientPage from "./pages/PatientPage";
import PatientDetailsPage from "./pages/PatientDetailsPage";
import UpdatePatientPage from "./pages/UpdatePatientPage";

function App() {
  return (
    <PatientProvider> 
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/patients" element={<PatientPage />} />
          <Route path="/patients/:id/details" element={<PatientDetailsPage />} />
          <Route path="/patients/:id/edit" element={<UpdatePatientPage />} />
        </Routes>
      </Router>
    </PatientProvider>
  );
}

export default App;