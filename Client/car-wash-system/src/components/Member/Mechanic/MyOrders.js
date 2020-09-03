import React, { useState, useEffect } from "react";
import MechanicOrders from "../../../services/member/Mechanic/Mechanic_Orders";
import AuthService from "../../../services/member/auth_service";
import "../Admin/CSS/Cars.css";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    const mechanic = AuthService.getCurrentMechanic();
    MechanicOrders.getAllOrders(mechanic.userId)
      .then((response) => {
        setOrders(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [columns, setColumns] = useState([
    { title: "OrderId", field: "_id" },
    { title: "Customer Name", field: "customerName" },
    { title: "Car Name", field: "carName" },
    { title: "Car Number", field: "carNumber" },
    { title: "Address", field: "custAddress" },
    { title: "Service Name", field: "serviceName" },
    { title: "Price", field: "servicePrice" },
    { title: "Status", field: "status" },
  ]);

  return (
    <div className="cars_container">
      <MaterialTable
        title="MY ORDERS DATA"
        columns={columns}
        data={orders}
        options={{
          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
          },
          exportButton: true,
        }}
      />
    </div>
  );
}

export default MyOrders;
