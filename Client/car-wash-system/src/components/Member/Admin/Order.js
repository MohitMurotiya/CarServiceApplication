import React, { useState, useEffect } from "react";
import AdminOrders from "../../../services/member/orders.js/admin_orders";
import "./CSS/Cars.css";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const getPlacedOrders = () => {
    AdminOrders.findPlacedOrders()
      .then((response) => {
        setOrders(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCompletedOrders = () => {
    AdminOrders.findCompletedOrders()
      .then((res) => {
        setCompletedOrders(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPlacedOrders();
    getCompletedOrders();
  }, []);

  const dynamicMechanicsLookUp = {
    "5f4481fae2fd8a20782f6d82": "Mechanic 1",
    "5f448212e2fd8a20782f6d83": "Mechanic 2",
    "5f448222e2fd8a20782f6d84": "Mechanic 3",
    "5f4dde667a82de39880f577c": "Mechanic 4",
  };
  const [columns, setColumns] = useState([
    { title: "OrderId", field: "_id", editable: "never" },
    { title: "Customer Name", field: "customerName", editable: "never" },
    { title: "Car Name", field: "carName", editable: "never" },
    { title: "Car Number", field: "carNumber", editable: "never" },
    { title: "Address", field: "custAddress", editable: "never" },
    { title: "Service Name", field: "serviceName", editable: "never" },
    { title: "Price", field: "servicePrice", editable: "never" },
    {
      title: "Assign Mechanic",
      field: "mechanicId",
      lookup: dynamicMechanicsLookUp,
    },
  ]);

  const [column, setColumn] = useState([
    { title: "OrderId", field: "_id" },
    { title: "Customer Name", field: "customerName" },
    { title: "Car Name", field: "carName" },
    { title: "Car Number", field: "carNumber" },
    { title: "Address", field: "custAddress" },
    { title: "Service Name", field: "serviceName" },
    { title: "Price", field: "servicePrice" },
    { title: "Assigned Mechanic", field: "mechanicId" },
  ]);

  const handleRowUpdate = (newData, oldData, resolve) => {
    let errorList = [];
    if (errorList.length < 1) {
      AdminOrders.assignOrder(newData._id, newData.mechanicId)
        .then((res) => {
          const dataUpdate = [...orders];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setOrders([...dataUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
          enqueueSnackbar(res, {
            variant: "success",
          });
        })
        .catch((error) => {
          setErrorMessages(["Update failed! Server error"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const [display, setdisplay] = useState(false);
  const openTable = () => {
    setdisplay(true);
  };

  const closeTable = () => {
    setdisplay(false);
  };
  return (
    <div className="cars_container">
      <br />

      <button onClick={openTable}>See Completed Orders</button>
      <br />
      {orders ? (
        <MaterialTable
          title="CURRENT ORDERS DATA"
          columns={columns}
          data={orders}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                handleRowUpdate(newData, oldData, resolve);
              }),
          }}
          options={{
            headerStyle: {
              backgroundColor: "#01579b",
              color: "#FFF",
            },
            exportButton: true,
          }}
        />
      ) : (
        <div>
          <br />
          <h2>NO CURRENT ORDERS RIGHT NOW</h2>
        </div>
      )}

      <br />
      <br />
      <br />

      {display ? (
        <div>
          <h1>COMPLETED ORDERS</h1>
          <MaterialTable
            title="CURRENT ORDERS DATA"
            columns={column}
            data={completedOrders}
            options={{
              headerStyle: {
                backgroundColor: "#01579b",
                color: "#FFF",
              },
              exportButton: true,
            }}
          />
          <br />
          <button onClick={closeTable}>Close Table</button>
          <br />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
}

export default Orders;
