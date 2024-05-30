import React, { useState, useEffect } from "react";
import ProductsServices from "../../../services/member/package/car_products";
import "./CSS/Cars.css";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";

function Products() {
  const [products, setProducts] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const getAllProducts = () => {
    ProductsServices.getAllProducts()
      .then((response) => {
        setProducts(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  const dynamicTypeLookUp = {
    1: "Body",
    2: "Engine",
    3: "Filters",
    4: "Bearings",
    5: "Air Conditioning",
    6: "Brake System",
    7: "Clutch System",
    8: "Belts Chains and Rollers",
    9:  "Wheels",
    10: "Tyres and Alloys"
  };
  const [columns, setColumns] = useState([
    {
      title: "PRODUCT TYPE",
      field: "productType",
      lookup: dynamicTypeLookUp,
    },
    { title: "NAME", field: "name" },
    { title: "PRICE", field: "price" },
    { title: "DESCRIPTION", field: "description" },
  ]);

  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = [];
    if (newData === undefined) {
      errorList.push("All fields are Required");
    }
    if (errorList.length < 1) {
      ProductsServices.addProduct(
        dynamicTypeLookUp[newData.productType],
        newData.name,
        newData.price,
        newData.description
      )
        .then((res) => {
          let dataToAdd = [...products];
          dataToAdd.push(newData);
          setProducts(dataToAdd);
          resolve();
          setErrorMessages([]);
          setIserror(false);
          enqueueSnackbar(res, {
            variant: "success",
          });
        })
        .catch((err) => {
          setErrorMessages(["Cannot add Product. Server error!"]);
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
    ProductsServices.deleteProduct(oldData._id)
      .then((res) => {
        const dataDelete = [...products];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setProducts([...dataDelete]);
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
      ProductsServices.updateProduct(
        newData._id,
        dynamicTypeLookUp[newData.productType],
        newData.name,
        newData.price,
        newData.description
      )
        .then((res) => {
          const dataUpdate = [...products];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setProducts([...dataUpdate]);
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
        title="PRODUCTS"
        columns={columns}
        data={products}
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

export default Products;
