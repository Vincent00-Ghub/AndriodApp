import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProfileInformation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state || {}; // Retrieve form data from state

  const handleContinue = () => {
    // Navigate to the logged-in page
    navigate("/logged-in");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <img
            src="https://th.bing.com/th/id/OIP.W7A5TNXQT0uioz0LHg6yTwHaHZ?rs=1&pid=ImgDetMain"
            alt="University Logo"
            style={styles.logo}
          />
          <h2 style={styles.title}>PROFILE INFORMATION</h2>
        </div>
        <div style={styles.form}>
          {Object.keys(formData).map((key) => (
            <div style={styles.formGroup} key={key}>
              <label style={styles.label}>
                {key === "studentNo" ? "STUDENT NUMBER:" : key.split(/(?=[A-Z])/).join(" ").toUpperCase()}:
              </label>
              <p style={styles.value}>
                {formData[key] || "N/A"}
              </p>
            </div>
          ))}
        </div>
        <button
          style={styles.continueButton}
          onClick={handleContinue} // Navigate to logged-in page
        >
          Continue
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to right, #006400, #FFD700)",
  },
  card: {
    width: "500px",
    background: "rgba(255, 255, 255, 0.7)",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  logo: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  title: {
    fontSize: "1.8em",
    color: "#006400",
    fontWeight: "bold",
  },
  form: {
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    fontSize: "1em",
    fontWeight: "bold",
    color: "#006400",
  },
  value: {
    fontSize: "1em",
    color: "#333",
  },
  continueButton: {
    padding: "12px 20px",
    backgroundColor: "#006400",
    color: "white",
    fontSize: "1.2rem",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
};

export default ProfileInformation;
