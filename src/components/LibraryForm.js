import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LibraryForm.css";

const StudentLibraryForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studno: "",
    grade: "",
    course: "",
    purpose: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null); // Clear error message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Front-end validation
    if (!formData.studno || !formData.grade || !formData.course || !formData.purpose) {
      setError("All fields are required!");
      return;
    }

    setLoading(true); // Set loading state
    try {
      const response = await fetch("http://localhost/react-app/backend/save_student_form.php", {
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
    <div className="library-form-container">
      <div className="form-card">
        <h2 className="form-title">Student Library Form</h2>
        <form onSubmit={handleSubmit}>
          {/* Student Number */}
          <div className="form-group">
            <label className="form-label">Student No.</label>
            <input
              className="form-input"
              type="text"
              name="studno"
              value={formData.studno}
              onChange={handleChange}
              placeholder="Enter your student number"
              required
            />
          </div>

          {/* Grade Level */}
          <div className="form-group">
            <label className="form-label">Grade Level</label>
            <select
              className="form-input"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              required
            >
              <option value="">Select Grade Level</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
              <option value="5th Year">5th Year</option>
            </select>
          </div>

          {/* Course */}
          <div className="form-group">
            <label className="form-label">Course</label>
            <select
              className="form-input"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            >
              <option value="">Select Course</option>
              <option value="CET Electronics Engineering (ECE)">CET Electronics Engineering (ECE)</option>
              <option value="CET Computer Engineering (CPE)">CET Computer Engineering (CPE)</option>
              <option value="CET Information Technology (IT)">CET Information Technology (IT)</option>
              <option value="CET IT Cybersecurity (CS)">CET IT Cybersecurity (CS)</option>
              <option value="CET IT Data Science (DS)">CET IT Data Science (DS)</option>
              <option value="CHS Nursing (BSN)">CHS Nursing(BSN)</option>
              <option value="BS in Business Administration Major in Marketing Management">CHS Physical Therapy (PT)</option>
              <option value="BS in Entrepreneurship">College of Criminal Justice (CCJ)</option>
              <option value="BS in Hospitality Management">College of Criminology (BSCRIM)</option>
              <option value="Bachelor of Arts in Communication">CED Physical Education (PE)</option>
              <option value="Bachelor of Arts in Political Science">CED English (ENG)</option>
              <option value="Bachelor in Public Administration">CED Mathematics (MATH)</option>
              <option value="CED Social Studies (SS)">CED Social Studies (SS)</option>
              <option value="CED General Science (GS)">CED General Science (GS)</option>
              <option value="BTVTE Automotive Technology (AT)">BTVTE Automotive Technology (AT)</option>
              <option value="BTVTE Computer Technology (CPT)">BTVTE Computer Technology (CPT)</option>
              <option value="BTVTE Electrical Technology (ET)">BTVTE Electrical Technology (ET)</option>
              <option value="BTVTE Electronics Technology (ECT)">BTVTE Electronics Technology (ECT)</option>
              <option value="BTVTE Food Service Management (FSM)">BTVTE Food Service Management (FSM)</option>
              <option value="BTVTE Garments Technology (GT)">BTVTE Garments Technology (GT)</option>
              <option value="BTVTE (HRST)">BTVTE (HRST)</option>
              <option value="BTVTE (HVAC)">BTVTE (HVAC)</option>
              <option value="CBA Accountancy">CBA Accountancy</option>
              <option value="CBA Accounting Information System (AIS)">CBA Accounting Information System (AIS)</option>
              <option value="CBA Economics (ECO)">CBA Economics (ECO)</option>
              <option value="CBA (HRDM)">CBA (HRDM)</option>
              <option value="CBA Marketing Management (MM)">CBA Marketing Management (MM)</option>
              <option value="CBA Entrepreneurship (ENTREP)">CBA Entrepreneurship (ENTREP)</option>
              <option value="CBA Supply Chain (SC)">CBA Supply Chain (SC)</option>
              <option value="CBA Hospitality Management (HM)">CBA Hospitality Management (HM)</option>
              <option value="CBA HM Travel Operation (HMTO)">CBA HM Travel Operation (HMTO)</option>
              <option value="CBA HM Recreation/Leisure (HMRL)">CBA HM Recreation/Leisure (HMRL)</option>
              <option value="CBA HM Heritage and Culture (HMHC)">CBA HM Heritage and Culture (HMHC)</option>
              <option value="College of Law (COL)">College of Law (COL)</option>
              <option value="CAS BA in Communication">CAS BA in Communication</option>
              <option value="CAS BA in Political Science">CAS BA in Political Science</option>
              <option value="CAS BA in Public Administration">CAS BA in Public Administration</option>
              <option value="CAS BA in Public Administration (SPA)">CAS BA in Public Administration (SPA)</option>
              <option value="CAS BS in Mathematics Major in Computer Science">CAS BS in Mathematics Major in Computer Science</option>
              <option value="CAS BS in Psychology">CAS BS in Psychology</option>
              <option value="CAS BS in Social Work">CAS BS in Social Work</option>
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
               <option value="">Select Purpose</option>
              <option value="Study">Study</option>
              <option value="Research">Research</option>
              <option value="Assignment">Assignment</option>
              <option value="Borrow Books">Borrow Books</option>
              <option value="Library Access">Library Access</option>
              <option value="Return Books">Return Books</option>
              <option value="Reading">Reading</option>
              <option value="Approval for Clearance">Approval for Clearance</option>
              <option value="Clearance for SPA and Graduate School">Clearance for SPA and Graduate School</option>
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
        <button className="form-back-button" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
};

export default StudentLibraryForm;
