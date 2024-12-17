import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any stored user data
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to home or login page
    const timer = setTimeout(() => {
      navigate("/");
    }, 2000); // Redirect after 2 seconds for user feedback

    return () => clearTimeout(timer); // Cleanup timer
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Logging Out...</h1>
      <p>You will be redirected to the homepage shortly.</p>
    </div>
  );
};

export default LogoutPage;
