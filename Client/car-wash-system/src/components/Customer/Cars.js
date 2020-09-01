import React, { useEffect, useState } from "react";
import CarouselComponent from "./CarouselComponent";
import CarService from "../../services/member/car/car_services";
import {
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  TextField,
} from "@material-ui/core";
import "./CSS/Brands.css";
import SearchIcon from "@material-ui/icons/Search";

function Cars(props) {
  const { match, history } = props;
  const { params } = match;
  const { brand } = params;

  const [cars, setCars] = useState([]);
  const [filter, setfilter] = useState("");

  const handleSearchChange = (e) => {
    setfilter(e.target.value);
  };

  const retrieveCars = () => {
    CarService.getCarsByBrand(brand)
      .then((response) => {
        setCars(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    retrieveCars();
  }, []);

  const getCarCards = (car) => {
    return (
      <Grid item xs={6} sm={4} md={3} lg={2} key={car._id}>
        <Card
          className="card"
          onClick={() => history.push(`/cust_home/services/${car._id}`)}
        >
          <CardContent>
            <Typography>{car.name}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <div>
      <CarouselComponent />
      <div className="brand">
        <h1 className="title">{`Available ${brand} Cars`}</h1>

        <div className="search">
          <SearchIcon className="searchIcon" />
          <TextField
            className="searchInput"
            label="Search for Cars"
            onChange={handleSearchChange}
          />
        </div>

        <Grid container spacing={3} className="grid_container">
          {cars.map((car) => car.name.includes(filter) && getCarCards(car))}
        </Grid>
      </div>
    </div>
  );
}

export default Cars;
