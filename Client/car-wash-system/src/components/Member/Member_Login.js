import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import AurhService from "../../services/member/auth_service";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import "../Home/Login.css";

export default function Member_Login(props) {
  const { handleSubmit, register, errors } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (values) => {
    AurhService.login(values.email, values.password).then((respone) => {
      if (respone.role === "ADMIN") {
        props.history.push("/admin_home");
      } else {
        props.history.push("/mechanic_home");
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
          SIGN IN
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
        </form>
      </div>
    </Container>
  );
}
