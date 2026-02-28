import { useEffect, useState } from "react";
import API from "../services/api";

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees/");
      setEmployees(res.data);
    } catch (err) {
      console.error("Failed to fetch employees");
    }
  };

  // Fetch attendance records
  const fetchAttendance = async (employeeId) => {
    if (!employeeId) return;

    try {
      setLoading(true);
      const res = await API.get(
        `/attendance/list/?employee_id=${employeeId}`
      );
      setAttendance(res.data);
    } catch (err) {
      console.error("Failed to fetch attendance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    fetchAttendance(selectedEmployee);
  }, [selectedEmployee]);

  // Handle form change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit
  const handleSubmit = async () => {
    setError("");

    try {
      await API.post("/attendance/", formData);

      // Refresh attendance list
      fetchAttendance(formData.employee_id);

      // Reset form
      setFormData({
        employee_id: "",
        date: "",
        status: "Present",
      });

    } catch (err) {
      if (err.response?.data?.errors) {
        const backendErrors = err.response.data.errors;

        if (backendErrors.error) {
          setError(backendErrors.error);
        } else if (backendErrors.employee_id) {
          setError(backendErrors.employee_id[0]);
        } else {
          setError("Something went wrong.");
        }
      } else {
        setError("Server error.");
      }
    }
  };

  return (
    <div>
      <div className="page-header">
        <h2>Attendance</h2>
      </div>

      {/* MARK ATTENDANCE */}
      <div className="attendance-card">
        <h3>Mark Attendance</h3>

        <div className="attendance-form-row">
          <select
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
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
            value={formData.date}
            onChange={handleChange}
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>

          <button
            className="add-btn"
            onClick={handleSubmit}
            disabled={!formData.employee_id || !formData.date}
          >
            Mark
          </button>
        </div>

        {error && <div className="attendance-error">{error}</div>}
      </div>

      {/* VIEW ATTENDANCE */}
      <div className="attendance-card">
        <h3>View Attendance</h3>

        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.employee_id}>
              {emp.full_name}
            </option>
          ))}
        </select>

        {loading && <p style={{ marginTop: "15px" }}>Loading...</p>}

        {!loading && attendance.length > 0 && (
          <div className="table-container" style={{ marginTop: "20px" }}>
            <table className="employee-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record) => (
                  <tr key={record.id}>
                    <td>{record.date}</td>
                    <td>
                      <span
                        className={`status-badge ${record.status.toLowerCase()}`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && selectedEmployee && attendance.length === 0 && (
          <p style={{ marginTop: "15px" }}>
            No attendance records found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Attendance;