import React, { useEffect, useState } from "react";
import "./CSS/AdminHome.css";
import HomeIcon from "@material-ui/icons/Home";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import BallotIcon from "@material-ui/icons/Ballot";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AdminOrders from "../../../services/member/orders.js/admin_orders";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

function AdminHome(props) {
  const { history } = props;
  const [orders, setOrders] = useState([]);

  const itemList = [
    {
      text: "HOME",
      icon: <HomeIcon />,
      onClick: () => history.push("/admin_home"),
    },
    {
      text: "CARS",
      icon: <DriveEtaIcon />,
      onClick: () => history.push("/admin_home/cars"),
    },
    {
      text: "Products",
      icon: <DriveEtaIcon />,
      onClick: () => history.push("/admin_home/products"),
    },
    {
      text: "Services",
      icon: <BallotIcon />,
      onClick: () => history.push("/admin_home/packages"),
    },
    {
      text: "Mechanics",
      icon: <SupervisorAccountIcon />,
      onClick: () => history.push("/admin_home/mechanics"),
    },
    {
      text: "Orders",
      icon: <MonetizationOnIcon />,
      onClick: () => history.push("/admin_home/orders"),
    },
    {
      text: "Log Out",
      icon: <ExitToAppIcon />,
      onClick: () => history.push("/login"),
    },
  ];

  const getCompletedOrders = () => {
    AdminOrders.findCompletedOrders()
      .then((res) => {
        setOrders(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCompletedOrders();
  }, []);

  return (
    <div className="admin_home">
      <hr />
      <h1>WELCOME ADMIN</h1>
      <h1>
        Your Total Earnings: &#8377;
        {orders
          .map((order) => order.servicePrice)
          .reduce((prev, next) => prev + next, 0)}
      </h1>
      <hr />

      <Drawer variant="permanent" className="drawer">
        <List>
          {itemList.map((item, index) => {
            return (
              <ListItem button key={item.text} onClick={item.onClick}>
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                <ListItemText primary={item.text} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
}

export default withRouter(AdminHome);
