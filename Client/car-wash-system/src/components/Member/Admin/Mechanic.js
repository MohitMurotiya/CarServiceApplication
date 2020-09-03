import React, { useState, useEffect } from "react";
import AuthServices from "../../../services/member/auth_service";
import MechanicServices from "../../../services/member/Mechanic/Mechanic_Services";
import "./CSS/Cars.css";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";

function Mechanic() {
  const [mechanic, setMechanic] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const getAllMecahnic = () => {
    MechanicServices.findAll()
      .then((response) => {
        setMechanic(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllMecahnic();
  }, []);

  const [columns, setColumns] = useState([
    { title: "ID", field: "_id" },
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Mobile", field: "mobile" },
    { title: "Status", field: "status" },
  ]);

  const { handleSubmit, register, errors } = useForm({
    mode: "onBlur",
  });

  const [display, setdisplay] = useState(false);
  const openForm = () => {
    setdisplay(true);
  };

  const closeForm = () => {
    setdisplay(false);
  };

  const onSubmit = (values) => {
    AuthServices.registerMechanic(
      values.name,
      values.email,
      values.password,
      values.mobile
    )
      .then((res) => {
        enqueueSnackbar(res, {
          variant: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRowDelete = (oldData, resolve) => {
    MechanicServices.deleteAccount(oldData._id)
      .then((res) => {
        const dataDelete = [...mechanic];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setMechanic([...dataDelete]);
        resolve();
        enqueueSnackbar(res, {
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar("Delete failed! Server error", {
          variant: "error",
        });
        resolve();
      });
  };

  return (
    <div className="cars_container">
      <h3>Mechanic Operations</h3>
      <br />

      <button onClick={openForm}>Add Mechanic</button>
      <br />
      <MaterialTable
        title="MECHANIC DATA"
        columns={columns}
        data={mechanic}
        editable={{
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

      {display ? (
        <Container maxWidth="xs">
          <div className="login__form">
            <h4>Create Mechanic Account</h4>
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    label="Name"
                    inputRef={register({
                      required: "Name is Required",
                    })}
                  />
                  {errors.name && <span>{errors.name.message}</span>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Mobile"
                    name="mobile"
                    inputRef={register({
                      required: "Mobile is Required",
                    })}
                  />
                  {errors.mobile && <span>{errors.mobile.message}</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    inputRef={register({
                      required: "Email is Required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && <span>{errors.email.message}</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    inputRef={register({
                      required: "Password is Required",
                    })}
                  />
                  {errors.password && <span>{errors.password.message}</span>}
                </Grid>
              </Grid>
              <br />
              <br />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="login_button"
              >
                CREATE ACCOUNT
              </Button>
            </form>
          </div>
          <br />
          <button onClick={closeForm}>Close Form</button>
          <br />
          <br />
          <br />
        </Container>
      ) : null}
    </div>
  );
}

export default Mechanic;
