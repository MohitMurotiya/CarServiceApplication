import React, { useEffect } from "react";
import "../Admin/CSS/AdminHome.css";
import HomeIcon from "@material-ui/icons/Home";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

function MechanicHome(props) {
  const { history } = props;

  const itemList = [
    {
      text: "HOME",
      icon: <HomeIcon />,
      onClick: () => history.push("/mechanic_home"),
    },
    {
      text: "FIND ORDERS",
      icon: <DriveEtaIcon />,
      onClick: () => history.push("/mechanic_home/findOrders"),
    },
    {
      text: "MY ORDERS",
      icon: <MonetizationOnIcon />,
      onClick: () => history.push("/mechanic_home/myorders"),
    },
    {
      text: "Log Out",
      icon: <ExitToAppIcon />,
      onClick: () => history.push("/login"),
    },
  ];
  return (
    <div className="admin_home">
      <hr />
      <h1>WELCOME MECHANIC</h1>
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

export default withRouter(MechanicHome);
