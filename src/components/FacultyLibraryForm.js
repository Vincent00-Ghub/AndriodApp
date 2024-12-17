import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FacultyLibraryForm.css";

const FacultyLibraryForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    workHours: "",
    collegeDept: "",
    purpose: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null); // Clear error message on input change
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Front-end validation
    if (!formData.name || !formData.workHours || !formData.collegeDept || !formData.purpose) {
      setError("All fields are required!");
      return;
    }

    setLoading(true); // Set loading state
    try {
      const response = await fetch("http://localhost/react-app/backend/save_faculty_form.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const text = await response.text();
      console.log("Raw Response:", text);

      const data = JSON.parse(text); // Parse JSON response
      if (data.success) {
        alert("Form submitted successfully!");
        navigate("/profile", { state: formData }); // Navigate to the profile page
      } else {
        setError(data.message || "An error occurred during submission.");
      }
    } catch (error) {
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="faculty-form-container">
      <div className="form-card">
        <h2 className="form-title">Faculty Library Form</h2>
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

          {/* Work Hours */}
          <div className="form-group">
            <label className="form-label">Work Hours</label>
            <select
              className="form-input"
              name="workHours"
              value={formData.workHours}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Work Hours
              </option>
              <option value="Part-time Work">Part-time Work</option>
              <option value="Full-time Work">Full-time Work</option>
            </select>
          </div>

          {/* College Department */}
          <div className="form-group">
            <label className="form-label">College Department</label>
            <select
              className="form-input"
              name="collegeDept"
              value={formData.collegeDept}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select College Department
              </option>
              <option value="CET">CET</option>
              <option value="CAS">CAS</option>
              <option value="CED">CED</option>
              <option value="CBA">CBA</option>
              <option value="CHS">CHS</option>
              <option value="IGOW">IGOW</option>
              <option value="LAW">LAW</option>
            </select>
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
              <option value="Study">Study</option>
              <option value="Research">Research</option>
              <option value="Borrow Books">Borrow Books</option>
              <option value="Library Access">Library Access</option>
              <option value="Return Books">Return Books</option>
              <option value="Reading">Reading</option>
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

export default FacultyLibraryForm;
