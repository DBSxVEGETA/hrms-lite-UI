import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <div style={styles.navbar}>
      <h2 style={styles.logo}>HRMS Lite</h2>

      <div>
        <Link
          to="/"
          style={{
            ...styles.link,
            ...(location.pathname === "/" && styles.active),
          }}
        >
          Employees
        </Link>

        <Link
          to="/attendance"
          style={{
            ...styles.link,
            ...(location.pathname === "/attendance" && styles.active),
          }}
        >
          Attendance
        </Link>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#111827",
    color: "white",
  },
  logo: {
    margin: 0,
  },
  link: {
    color: "white",
    textDecoration: "none",
    marginLeft: "20px",
    fontWeight: "500",
  },
  active: {
    borderBottom: "2px solid white",
  },
};

export default Navbar;