import React from "react";
import { useNavigate } from "react-router-dom";
import "./LibraryHeader.css";

const LibraryHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="library-header">
      <div className="logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/7/75/Universidad_de_Manila_seal.png/180px-Universidad_de_Manila_seal.png"
          alt="UDM Logo"
          className="udm-logo"
        />
      </div>
      <h1 className="welcome-text">Welcome to UDM - Library</h1>
      <div className="button-group">
  <button className="login-button" onClick={() => navigate("/library-form")}>
    For Students
  </button>
  <button className="login-button" onClick={() => navigate("/faculty-library-form")}>
    For Faculty
  </button>
  <button className="login-button" onClick={() => navigate("/visitor-library-form")}>
    For Visitors
  </button>
</div>
    </div>
  );
};

export default LibraryHeader;
