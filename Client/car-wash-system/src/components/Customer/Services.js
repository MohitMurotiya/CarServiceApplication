import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./CSS/Services.css";
import Package from "../../services/member/package/package_services";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Services(props) {
  const { match, history } = props;
  const { params } = match;
  const { car } = params;
  const classes = useStyles();

  const [services, setServices] = useState([]);

  useEffect(() => {
    Package.getAllServices()
      .then((response) => {
        setServices(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getServiceCards = (res) => {
    var type,
      where = "";
    if (res.serviceType == 1) {
      type = "Car Care Services";
    } else {
      type = "Periodic Car Service";
    }

    if (res.where == 1) {
      where = "Free Pickup & Drop";
    } else {
      where = "Service @ Doorstep";
    }
    return (
      <Grid item xs={12} sm={12} md={6} lg={6} key={res._id}>
        <Card
          className="service_card"
          variant="outlined"
          onClick={() =>
            history.push(`/cust_home/order/car/${car}/service/${res._id}`)
          }
        >
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {type}
            </Typography>
            <Typography variant="h5" component="h2">
              {res.name}
            </Typography>
            <Typography component="h6">{res.price}</Typography>
            <Typography variant="body2" component="p">
              {res.description}
            </Typography>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {where}
            </Typography>
            <hr></hr>
            <div className="action_buttons">
              <span className="timeline">
                {`service done in ${res.timeRequired}`}
              </span>
              <button className="buy_button">Buy</button>
            </div>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <div className="container">
      <button onClick={() => history.push(`/cust_home`)}>Change Car</button>
      <hr />
      <Grid container spacing={5} className="grid_container">
        {services.map((res) => getServiceCards(res))}
      </Grid>
    </div>
  );
}
