import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoggedIn = () => {
  const navigate = useNavigate();

  // Redirect to dashboard after login
  React.useEffect(() => {
    navigate("/dashboard");
  }, [navigate]);

  return (
    <div>
      <p>Logging you in...</p>
    </div>
  );
};

export default LoggedIn;
