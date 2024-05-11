import React, { useEffect, useState } from "react";
import CustomerService from "../../services/customer/customer_service";
import AuthService from "../../services/customer/authentication/auth_service";
import "./CSS/MyBookings.css";
import { Card, Grid, CardContent, Box } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function MyBookings() {
  const [orders, setorders] = useState([]);
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);

  useEffect(() => {
    const user = AuthService.getCurrentCustomer();
    CustomerService.findMyOrders(user.userId)
      .then((res) => {
        setorders(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getOrderCards = (order) => {
    return (
      <Grid item xs={12} sm={12} md={12} lg={12} key={order._id}>
        <Card variant="outlined" className="service_card">
          <CardContent>
            <h1>Your Order Request is {order.status}</h1>
            <hr />
            <h4>Car : {order.carName}</h4>
            <h4>Vehicle Number: {order.carNumber}</h4>
            <h4>Address: {order.custAddress}</h4>
            <h4>Service Name: {order.serviceName}</h4>
            <h4>Service Price: {order.servicePrice}</h4>

            {order.status === "COMPLETED" ? (
              <div className="ratings">
                <Rating
                  name="hover-feedback"
                  value={value}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                />
                {value !== null && (
                  <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </CardContent>
        </Card>
      </Grid>
    );
  };
  return (
    <div className="container">
      <h1 className="summary_title">MY BOOKINGS</h1>
      {orders ? (
        <Grid container spacing={4} className="">
          {orders.map((order) => getOrderCards(order))}
        </Grid>
      ) : (
        <div>
          <br />
          <h1>NO BOOKINGS</h1>
        </div>
      )}
    </div>
  );
}

export default MyBookings;
