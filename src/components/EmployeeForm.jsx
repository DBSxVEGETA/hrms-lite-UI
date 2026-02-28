// import { useState } from "react";
// import API from "../services/api";

// function EmployeeForm({ closeModal, refresh }) {
//   const [formData, setFormData] = useState({
//     employee_id: "",
//     full_name: "",
//     email: "",
//     department: "",
//   });

//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       await API.post("/employees/", formData);
//       refresh();
//       closeModal();
//     } catch (err) {
//         if (err.response && err.response.data.errors) {
//           const backendErrors = err.response.data.errors;
        
//           if (backendErrors.employee_id) {
//             setError(backendErrors.employee_id[0]);
//           } else if (backendErrors.email) {
//             setError(backendErrors.email[0]);
//           } else {
//             setError("Failed to create employee.");
//           }
//         } else {
//           setError("Server error. Please try again.");
//         }
// }
//   };

//   return (
//     <div style={styles.overlay}>
//       <div style={styles.modal}>
//         <h3>Add Employee</h3>

//         {error && <p style={{ color: "red" }}>{error}</p>}

//         <form onSubmit={handleSubmit}>
//           <input name="employee_id" placeholder="Employee ID" onChange={handleChange} required />
//           <input name="full_name" placeholder="Full Name" onChange={handleChange} required />
//           <input name="email" placeholder="Email" onChange={handleChange} required />
//           <input name="department" placeholder="Department" onChange={handleChange} required />

//           <div style={{ marginTop: "15px" }}>
//             <button type="submit" className="primary-btn">Save</button>
//             <button
//               type="button"
//               onClick={closeModal}
//               style={{ marginLeft: "10px" }}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   overlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     background: "rgba(0,0,0,0.4)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modal: {
//     background: "white",
//     padding: "25px",
//     borderRadius: "8px",
//     width: "400px",
//   },
// };

// export default EmployeeForm;

import { useState } from "react";
import API from "../services/api";

function EmployeeForm({ closeModal, refresh }) {
  const [formData, setFormData] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
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
      await API.post("/employees/", formData);
      refresh();
      closeModal();
    } catch (err) {
      if (err.response?.data?.errors) {
        const backendErrors = err.response.data.errors;

        if (backendErrors.employee_id) {
          setError(backendErrors.employee_id[0]);
        } else if (backendErrors.email) {
          setError(backendErrors.email[0]);
        } else {
          setError("Something went wrong.");
        }
      } else {
        setError("Server error. Please try again.");
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">

        <div className="modal-header">
          <h3>Add New Employee</h3>
          <button className="close-btn" onClick={closeModal}>×</button>
        </div>

        <div className="modal-body">
          {error && <div className="modal-error">{error}</div>}

          <form onSubmit={handleSubmit} className="form-grid">

            <div className="form-group">
              <label>Employee ID *</label>
              <input
                type="text"
                name="employee_id"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="full_name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Department *</label>
              <input
                type="text"
                name="department"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="modal-save-btn">
                Save
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default EmployeeForm;