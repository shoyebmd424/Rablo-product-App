import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "../Axios";
import { useAuth } from "../Context/AuthContext";

export default function ProtectedRoutes() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/auth/user-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : "Loading";
}
