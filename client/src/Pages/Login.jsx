import React, { useState } from "react";
import Axios from "../Axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../Components/Layout";
import { useAuth } from "../Context/AuthContext";
const Login = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.post("/auth/signin", {
        username,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/dashboard");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="form-container d-flex" style={{ minHeight: "90vh" }}>
        <div className="card col-3 m-auto ">
          <form onSubmit={handleSubmit} className="p-4">
            <h4 className="title">Login Here</h4>
            <div className="mb-3">
              <input
                type="email"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter Your username "
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Your Password"
                required
              />
            </div>
            <Link to="/forget" style={{ textDecoration: "none" }}>
              forget Password
            </Link>
            <div className="mt-3">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
