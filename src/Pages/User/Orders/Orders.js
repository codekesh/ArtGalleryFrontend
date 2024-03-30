import React from "react";
import Footer from "../../../components/Footer/Footer";
import Copyright from "../../../components/Copyright/Copyright";
import UserMenu from "../../../components/UserMenu/UserMenu";

const Profile = () => {
  return (
    <>
      <div className="userdashboardHeader">
        <UserMenu />
        <div>Orders</div>
      </div>
      <Footer />
      <Copyright />
    </>
  );
};

export default Profile;
