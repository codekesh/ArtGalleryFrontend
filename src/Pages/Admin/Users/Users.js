import React from "react";
import Footer from "../../../components/Footer/Footer";
import Copyright from "../../../components/Copyright/Copyright";
import AdminMenu from "../../../components/AdminMenu/AdminMenu";

const Users = () => {
  return (
    <>
      <div className="adminDashboardHeader">
        <AdminMenu />
        <div>All Users</div>
      </div>
      <Footer />
      <Copyright />
    </>
  );
};

export default Users;
