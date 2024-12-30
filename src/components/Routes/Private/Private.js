import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import { Outlet } from "react-router-dom";
import Loading from "../Loading/Loading";
import axiosInstance from "../../../api/axiosInstance";

const Private = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axiosInstance.get("/user-auth");
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

export default Private;
