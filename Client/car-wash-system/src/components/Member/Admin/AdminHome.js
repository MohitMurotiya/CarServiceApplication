import React, { useEffect } from "react";
import "./CSS/AdminHome.css";
import Service from "../../../services/member/package/package_services";

function AdminHome() {
  useEffect(() => {
    Service.getAllServices();
  }, []);
  return (
    <div className="admin_home">
      <h1>Hello</h1>
    </div>
  );
}

export default AdminHome;
