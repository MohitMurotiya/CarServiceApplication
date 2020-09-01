import React, { useState, useEffect } from "react";
import PackageServices from "../../../services/member/package/package_services";
import "./CSS/Cars.css";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";

function Services() {
  const [services, setServices] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const getAllServices = () => {
    PackageServices.getAllServices()
      .then((response) => {
        setServices(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllServices();
  }, []);

  const dynamicTypeLookUp = {
    1: "Car Care Services",
    2: "Periodic Car Service",
  };
  const dynamicWhereLookUp = {
    1: "Free Pickup & Drop",
    2: "Service @ Doorstep",
  };
  const [columns, setColumns] = useState([
    {
      title: "TYPE",
      field: "serviceType",
      lookup: dynamicTypeLookUp,
    },
    { title: "NAME", field: "name" },
    { title: "PRICE", field: "price" },
    { title: "DESCRIPTION", field: "description" },
    { title: "TIME", field: "timeRequired" },
    { title: "WHERE", field: "where", lookup: dynamicWhereLookUp },
  ]);

  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = [];
    if (newData === undefined) {
      errorList.push("All fields are Required");
    }
    if (errorList.length < 1) {
      PackageServices.addService(
        newData.serviceType,
        newData.name,
        newData.price,
        newData.description,
        newData.timeRequired,
        newData.where
      )
        .then((res) => {
          let dataToAdd = [...services];
          dataToAdd.push(newData);
          setServices(dataToAdd);
          resolve();
          setErrorMessages([]);
          setIserror(false);
          enqueueSnackbar(res, {
            variant: "success",
          });
        })
        .catch((err) => {
          setErrorMessages(["Cannot add data. Server error!"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
      enqueueSnackbar(errorList[0], {
        variant: "error",
      });
    }
  };

  const handleRowDelete = (oldData, resolve) => {
    PackageServices.deleteService(oldData._id)
      .then((res) => {
        const dataDelete = [...services];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setServices([...dataDelete]);
        resolve();
        enqueueSnackbar(res, {
          variant: "success",
        });
      })
      .catch((error) => {
        setErrorMessages(["Delete failed! Server error"]);
        setIserror(true);
        resolve();
        enqueueSnackbar(errorMessages[0], {
          variant: "error",
        });
      });
  };

  const handleRowUpdate = (newData, oldData, resolve) => {
    let errorList = [];
    if (errorList.length < 1) {
      PackageServices.updateService(
        newData._id,
        newData.serviceType,
        newData.name,
        newData.price,
        newData.description,
        newData.timeRequired,
        newData.where
      )
        .then((res) => {
          const dataUpdate = [...services];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setServices([...dataUpdate]);
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

  return (
    <div className="cars_container">
      <MaterialTable
        title="SERVICES DATA"
        columns={columns}
        data={services}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              handleRowAdd(newData, resolve);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              handleRowUpdate(newData, oldData, resolve);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              handleRowDelete(oldData, resolve);
            }),
        }}
        options={{
          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
          },
        }}
      />
    </div>
  );
}

export default Services;
