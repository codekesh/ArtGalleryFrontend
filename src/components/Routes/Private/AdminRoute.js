import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/admin-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return ok ? <Outlet /> : <Loading path="/" />;
};

export default AdminRoute;
