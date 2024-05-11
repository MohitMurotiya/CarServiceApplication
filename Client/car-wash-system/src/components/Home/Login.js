import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AurhService from "../../services/customer/authentication/auth_service";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import "./Login.css";
import { useSnackbar } from "notistack";

export default function Login(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { handleSubmit, register, errors } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (values) => {
    AurhService.login(values.email, values.password).then((response) => {
      //console.log(response);
      if (response.userId == null) {
        enqueueSnackbar(response.message, {
          variant: "error",
        });
      } else {
        props.history.push("/cust_home");
        enqueueSnackbar(response.message, {
          variant: "success",
        });
      }
    });
  };
  return (
    <Container maxWidth="xs">
      <div className="login__form">
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            type="email"
            name="email"
            inputRef={register({
              required: "Email is Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <span className="span">{errors.email.message}</span>}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            name="password"
            inputRef={register({
              required: "Password is Required",
            })}
          />
          {errors.password && (
            <span className="span">{errors.password.message}</span>
          )}
          <Button className="login__button" type="submit" block color="primary">
            Sign In
          </Button>
          <Grid className="login__grid" container>
            <Grid item xs>
              <Link className="link" to="/member_login">
                Sign In as a Member?
              </Link>
            </Grid>
            <Grid item>
              <Link className="link" to="/register">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
