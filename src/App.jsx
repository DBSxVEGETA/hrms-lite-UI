import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Employees />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;