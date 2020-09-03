import React, { useState, useEffect } from "react";
import CarServices from "../../../services/member/car/car_services";
import "./CSS/Cars.css";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";

function Cars() {
  const [cars, setCars] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const getAllCars = () => {
    CarServices.getAllCars()
      .then((response) => {
        setCars(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllCars();
  }, []);

  const [columns, setColumns] = useState([
    { title: "Name", field: "name" },
    { title: "Brand", field: "brand" },
  ]);

  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = [];
    if (newData.name === undefined) {
      errorList.push("Please enter car name");
    }

    if (newData.brand === undefined) {
      errorList.push("Please enter Brand name");
    }

    if (errorList.length < 1) {
      CarServices.addCar(newData.name, newData.brand)
        .then((res) => {
          let dataToAdd = [...cars];
          dataToAdd.push(newData);
          setCars(dataToAdd);
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
    }
  };

  const handleRowDelete = (oldData, resolve) => {
    CarServices.deleteCar(oldData._id)
      .then((res) => {
        const dataDelete = [...cars];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setCars([...dataDelete]);
        resolve();
        enqueueSnackbar(res, {
          variant: "success",
        });
      })
      .catch((error) => {
        setErrorMessages(["Delete failed! Server error"]);
        setIserror(true);
        resolve();
      });
  };

  const handleRowUpdate = (newData, oldData, resolve) => {
    let errorList = [];
    if (newData.brand === undefined) {
      errorList.push("Please enter Brand name");
    }
    if (errorList.length < 1) {
      CarServices.updateCar(newData._id, newData.brand)
        .then((res) => {
          const dataUpdate = [...cars];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setCars([...dataUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
          console.log(res);
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
        title="CARS DATA"
        columns={columns}
        data={cars}
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

export default Cars;
