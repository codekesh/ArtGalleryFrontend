import React from "react";
import Footer from "../../../components/Footer/Footer";
import Copyright from "../../../components/Copyright/Copyright";
import AdminMenu from "../../../components/AdminMenu/AdminMenu";
import { useAuth } from "../../../context/AuthProvider";
import "./Admindashboard.css";

const Admindashboard = () => {
  const [auth] = useAuth();

  return (
    <>
      <div className="adminDashboardHeader">
        <AdminMenu />
        <div className="adminDetailsHeader">
          <span>Name: {auth?.user?.name}</span>
          <span>Email: {auth?.user?.email}</span>
          <span>Contact: {auth?.user?.contact}</span>
        </div>
      </div>
      <Footer />
      <Copyright />
    </>
  );
};

export default Admindashboard;
