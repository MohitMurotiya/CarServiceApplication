import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AurhService from "../../services/customer/authentication/auth_service";

function Register(props) {
  const { handleSubmit, register, errors } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (values) => {
    AurhService.register(values.name, values.email, values.password).then(
      (respone) => {
        props.history.push("/login");
      }
    );
  };
  return (
    <Container maxWidth="xs">
      <div className="login__form">
        <h1>REGISTER</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="standard"
            margin="normal"
            fullWidth
            label="Enter Name"
            placeholder="Enter Your Name"
            type="name"
            name="name"
            autoFocus
            inputRef={register({
              required: "Name is Required",
            })}
          />
          {errors.name && <span>{errors.name.message}</span>}
          <TextField
            variant="standard"
            margin="normal"
            fullWidth
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter Your Email"
            inputRef={register({
              required: "Email is Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
          <TextField
            variant="standard"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            name="password"
            placeholder="Enter Password"
            inputRef={register({
              required: "Password is Required",
              minLength: {
                value: 6,
                message: "Minimum length of 6 is required",
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
          <Button className="login__button" type="submit" block color="primary">
            Sign Up
          </Button>
          <Grid className="login__grid" container>
            <Grid item>
              <Link className="link" to="/login">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Register;
