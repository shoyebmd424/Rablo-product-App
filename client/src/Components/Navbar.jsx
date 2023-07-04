import React from "react";
import { toast } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid " style={{ fontWeight: "bold" }}>
        <NavLink to="/" className="navbar-brand" href="#">
          Rablo.i
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-link active"
                aria-current="page"
                href="#"
              >
                Home
              </NavLink>
            </li>
            {!auth?.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link" href="#">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link" href="#">
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink onClick={handleLogout} className="nav-link" href="#">
                    Logout
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link" href="#">
                    {auth?.user?.name}
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
