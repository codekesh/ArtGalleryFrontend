import React from "react";
import Footer from "../../../components/Footer/Footer";
import Copyright from "../../../components/Copyright/Copyright";
import UserMenu from "../../../components/UserMenu/UserMenu";
import { useAuth } from "../../../context/AuthProvider";
import "./Userdashboard.css";

const Userdashboard = () => {
  const [auth] = useAuth();
  return (
    <>
      <div className="userdashboardHeader">
        <UserMenu />
        <div className="userDetailsHeader">
          <h2>User Name: {auth?.user?.name}</h2>
          <h2>User Email: {auth?.user?.email}</h2>
          <h2>User Contact: {auth?.user?.contact}</h2>
        </div>
      </div>
      <Footer />
      <Copyright />
    </>
  );
};

export default Userdashboard;
