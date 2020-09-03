import React, { useEffect, useState } from "react";
import AuthService from "../../services/customer/authentication/auth_service";
import CustomerService from "../../services/customer/customer_service";
import CarService from "../../services/member/car/car_services";
import PackageService from "../../services/member/package/package_services";
import "./CSS/Order.css";
import { Card, Grid, TextField, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

function Order(props) {
  const { match, history } = props;
  const { params } = match;
  const { carId, serviceId } = params;
  const [user, setUser] = useState("");
  const [service, setService] = useState([]);
  const [car, setCar] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const getPackage = () => {
    PackageService.findServiceById(serviceId)
      .then((res) => {
        setService(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCar = () => {
    CarService.findCarById(carId)
      .then((res) => {
        setCar(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const user = AuthService.getCurrentCustomer();
    setUser(user);

    getCar();
    getPackage();
  }, []);

  const { handleSubmit, register, errors } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (values) => {
    CustomerService.placeOrder(
      user.userId,
      car._id,
      values.carNumber,
      values.custAddress,
      service._id
    )
      .then((response) => {
        enqueueSnackbar(response, {
          variant: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <h1 className="summary_title">ORDER SUMMARY</h1>
      <Card>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <h1>Personal Details</h1>
            <h1>{user.email}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                color="primary"
                variant="outlined"
                label="Vehicle Number"
                name="carNumber"
                margin="normal"
                inputRef={register({
                  required: "Number is Required",
                })}
              />
              {errors.carNumber && (
                <span className="span">{errors.carNumber.message}</span>
              )}
              <br />
              <TextField
                color="primary"
                variant="outlined"
                label="Address"
                multiline
                name="custAddress"
                margin="normal"
                inputRef={register({
                  required: "Address is Required",
                })}
              />
              {errors.custAddress && (
                <span className="span">{errors.custAddress.message}</span>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className=""
              >
                PLACE ORDER
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <h1>Service Details</h1>
            <h1>{service.name}</h1>
            <h3>{service.price}</h3>
            <h3>{service.timeRequired}</h3>
            <h1>{car.name}</h1>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

export default Order;
