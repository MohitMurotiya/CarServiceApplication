import React, { useEffect, useState } from 'react'
import ProductService from "../../services/member/package/car_products";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
} from "@material-ui/core";
import "./CSS/Brands.css";
import SearchIcon from "@material-ui/icons/Search";

function Products(props) {
    const { match, history } = props;
    const { params } = match;
    const { category } = params;
    const [products, setProducts] = useState([]);

    const [filter, setfilter] = useState("");

    const handleSearchChange = (e) => {
        setfilter(e.target.value);
    };

    const getAllProductsByCategory = (category) => {
        ProductService.getAllProducts()
        .then((products) => {
            setProducts(products.filter((obj) => obj.productType === category));
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        console.log(category);
        getAllProductsByCategory(category)
    }, []);

    const getProductCards = (product) => {
        return (
          <Grid item xs={3} sm={4} md={3} lg={2} key={product._id}>
            <Card
              className="card"
              onClick={() => history.push(`/cust_home/services/${product._id}`)}
            >
              <CardContent>
                <Typography>{product.name}</Typography>
                <Typography>{product.price}</Typography>
                <Typography>{product.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      };


  return (
    <div style={{ margin: '100px 40px 0'}}  className="brand">
        <h1 className="title">{`Products Available under category ${category}`}</h1>

        <div className="search">
          <SearchIcon className="searchIcon" />
          <TextField
            className="searchInput"
            label="Search for Products"
            onChange={handleSearchChange}
          />
        </div>

        <Grid container spacing={3} className="grid_container">
          {products.map((product) => product.name.toLowerCase().includes(filter.toLowerCase()) && getProductCards(product))}
        </Grid>
      </div>
  )
}

export default Products