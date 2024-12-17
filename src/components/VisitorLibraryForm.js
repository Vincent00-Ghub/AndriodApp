import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LibraryForm.css"; // Reuse the styles for consistency

const VisitorLibraryForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    purpose: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null); // Clear error on change
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.purpose) {
      setError("All fields are required.");
      return;
    }

    setLoading(true); // Show loading state
    try {
      const response = await fetch("http://localhost/react-app/backend/save_visitor_form.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const text = await response.text();
      console.log("Raw Response:", text);

      const data = JSON.parse(text); // Parse JSON response
      if (data.success) {
        alert("Form submitted successfully!");
        navigate("/profile", { state: formData });
      } else {
        setError(data.message || "An error occurred during submission.");
      }
    } catch (error) {
      setError("Unable to connect to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="library-form-container">
      <div className="form-card">
        <h2 className="form-title">Visitor Form</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              className="form-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Purpose */}
          <div className="form-group">
            <label className="form-label">Purpose</label>
            <select
              className="form-input"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Purpose
              </option>
              <option value="Library Tour">Library Tour</option>
              <option value="Borrowing Materials">Borrowing Materials</option>
              <option value="Research">Research</option>
              <option value="Event Attendance">Event Attendance</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Error Message */}
          {error && <div className="form-error">{error}</div>}

          {/* Submit Button */}
          <button type="submit" className="form-submit-button" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {/* Back Button */}
        <button className="form-back-button" onClick={() => navigate("/")}>
          Back
        </button>
      </div>
    </div>
  );
};

export default VisitorLibraryForm;
