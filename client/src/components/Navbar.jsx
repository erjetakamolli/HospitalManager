import PropTypes from 'prop-types';
import { useContext } from 'react';
import { PatientContext } from '../context/PatientContext';
import { useLocation, useNavigate } from 'react-router-dom';
import "../styles/Navbar.css";

const formatText = (text) => {
  return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};

const Navbar = ({ homeLink, title }) => {
  const { patients } = useContext(PatientContext);
  const location = useLocation();
  const navigate = useNavigate();

  const isAddPatientPage = location.pathname === "/";
  const isPatientListPage = location.pathname === "/patients";

  let patientMessage = "";
  if (isAddPatientPage) {
    patientMessage = `Number Of Patients: ${patients.length}`;
  } else if (isPatientListPage) {
    patientMessage = `Displaying ${patients.length} Patients`;
  }

  return (
    <nav>
      <a href={homeLink}>{formatText("home")}</a> 
      
      <span>{formatText(title)} {patientMessage && `(${formatText(patientMessage)})`}</span>
      
      <div className="navbar-buttons">
        {isPatientListPage && (
          <button onClick={() => navigate("/")} className="admit-button">
            {formatText("admit")} 
          </button>
        )}
        
        {location.pathname.startsWith("/patients/") && location.pathname.endsWith("/edit") && (
          <button onClick={() => navigate(`/patients/${location.pathname.split('/')[2]}/details`)} className="details-button">
            {formatText("details")} 
          </button>
        )}
        
        {location.pathname.startsWith("/patients/") && location.pathname.endsWith("/details") && (
          <button onClick={() => navigate(`/patients/${location.pathname.split('/')[2]}/edit`)} className="update-button">
            {formatText("update")} 
          </button>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  homeLink: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Navbar;