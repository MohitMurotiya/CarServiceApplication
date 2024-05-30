import React, { useEffect, useState } from 'react'
import ProductService from "../../services/member/package/car_products";
import { withRouter } from "react-router-dom";

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

function Category(props) {
    const { history } = props;
    const [categories, setCategories] = useState([]);
    const [filter, setfilter] = useState("");

    const getAllCategories = () => {
      ProductService.getAllProducts()
      .then((products) => {
        setCategories(products);
      }).catch((err) => {
        console.log(err);
      })
    }

    useEffect(() => {
      getAllCategories()
    }, []);

    const handleSearchChange = (e) => {
      setfilter(e.target.value);
    };

    const getCategoryCard = (category) => {
      return (
        <Grid item xs={6} sm={4} md={3} lg={2} key={category}>
          <Card
            className="card"
            onClick={() => history.push(`/cust_home/products/${category}`)}
          >
            <CardContent>
              <Typography className="text">{category}</Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    };

  return (
    <div style={{ margin: '100px 40px 0'}} className='category'>
      <h1 className='title'>TOP CATEGORIES</h1>
      <div className="search">
        <SearchIcon className="searchIcon" />
        <TextField
          className="searchInput"
          label="Search for Categories"
          onChange={handleSearchChange}
        />
      </div>

      {categories ? (
        <Grid container spacing={3} item className="grid_container">
          {categories.map(
            (category) => category.productType.toLowerCase().includes(filter.toLowerCase()) && getCategoryCard(category.productType)
          )}
          </Grid>
        ) : (
          <CircularProgress />
        )}
    </div>
  )
}

export default withRouter(Category)