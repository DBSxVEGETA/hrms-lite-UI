import { useEffect, useState } from "react";
import API from "../services/api";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Fetch Employees
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await API.get("/employees/");
      setEmployees(response.data);
    } catch (err) {
      setError("Failed to fetch employees.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Dashboard Summary
  const fetchSummary = async () => {
    try {
      const res = await API.get("/dashboard-summary/");
      setSummary(res.data);
    } catch (err) {
      console.error("Failed to fetch summary");
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchSummary();
  }, []);

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <h2>Employees</h2>
        <button
          className="add-btn"
          onClick={() => setShowModal(true)}
        >
          + Add Employee
        </button>
      </div>

      {/* DASHBOARD SUMMARY CARDS */}
      {summary && (
        <div className="dashboard-summary">
          <div className="summary-card">
            <h4>Total Employees</h4>
            <p>{summary.total_employees}</p>
          </div>

          <div className="summary-card present">
            <h4>Present Today</h4>
            <p>{summary.present_today}</p>
          </div>

          <div className="summary-card absent">
            <h4>Absent Today</h4>
            <p>{summary.absent_today}</p>
          </div>
        </div>
      )}

      {/* Loading / Error States */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && employees.length === 0 && (
        <p>No employees found.</p>
      )}

      {/* Employee Table */}
      {!loading && employees.length > 0 && (
        <EmployeeTable
          employees={employees}
          refresh={() => {
            fetchEmployees();
            fetchSummary();   // refresh summary when employees change
          }}
        />
      )}

      {/* Add Employee Modal */}
      {showModal && (
        <EmployeeForm
          closeModal={() => setShowModal(false)}
          refresh={() => {
            fetchEmployees();
            fetchSummary();   // refresh summary after adding employee
          }}
        />
      )}
    </div>
  );
}

export default Employees;