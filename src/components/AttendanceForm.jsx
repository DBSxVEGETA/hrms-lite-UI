import { useState } from "react";
import API from "../services/api";

function AttendanceForm({ employees, refreshAttendance }) {
  const [formData, setFormData] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await API.post("/attendance/", formData);
      refreshAttendance();
      alert("Attendance marked successfully!");
    } catch (err) {
        if (err.response && err.response.data.errors) {
          const backendErrors = err.response.data.errors;
        
          if (backendErrors.error) {
            setError(backendErrors.error);
          } else if (backendErrors.employee_id) {
            setError(backendErrors.employee_id[0]);
          } else {
            setError("Failed to mark attendance.");
          }
        } else {
          setError("Server error. Please try again.");
        }
}
  };

  return (
    <div className="card">
      <h3>Mark Attendance</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <select
          name="employee_id"
          onChange={handleChange}
          required
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.employee_id}>
              {emp.full_name}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          onChange={handleChange}
          required
        />

        <select
          name="status"
          onChange={handleChange}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button type="submit" className="primary-btn">
          Mark
        </button>
      </form>
    </div>
  );
}

export default AttendanceForm;