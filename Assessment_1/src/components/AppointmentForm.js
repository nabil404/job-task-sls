import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
  Snackbar,
  Typography,
} from "@material-ui/core";

import useForm from "../hooks/useForm";

const initialState = {
  id: "",
  firstName: "",
  lastName: "",
  age: "",
  email: "",
  address: "",
  phone: "",
  date: "",
  slot: "",
};

const AppointmentForm = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [errorMsg, setErrMsg] = useState("");
  const [values, setValues, onValueChange] = useForm(initialState);
  const [snackbarStatus, setSnackbarStatus] = useState(false);

  const fetchClientData = () => {
    if (localStorage.getItem("AppointmentData")) {
      const fetchedData = localStorage.getItem("AppointmentData");
      setData(JSON.parse(fetchedData));
    }
  };

  useEffect(() => {
    fetchClientData();
  }, [snackbarStatus]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!values.slot) {
      return setErrMsg("Select a slot first");
    }
    const newData = { ...values, id: Math.ceil(Math.random() * 5000) };
    localStorage.setItem(
      "AppointmentData",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("AppointmentData") || "[]"),
        newData,
      ])
    );
    setValues({ ...initialState });
    setSnackbarStatus(true);
  };

  const handleSnackbarClose = (event, reason) => {
    setSnackbarStatus(false);
  };

  const getSlots = (clientData) => {
    const initialArray = [...clientData];
    const finalObj = {};
    initialArray.forEach((obj) => {
      if (finalObj[obj["date"]]) {
        finalObj[obj["date"]].push(obj["slot"]);
      } else {
        finalObj[obj["date"]] = [obj["slot"]];
      }
    });
    return finalObj;
  };

  const renderSlots = (data) => {
    let slotsAvailable = ["4:00 - 5:00", "5:00 - 7:00", "6:00 - 7:00"];

    if (values.date) {
      const slotsOccupied = data[values.date] || [];
      slotsOccupied.forEach((slot) => {
        slotsAvailable.splice(slotsAvailable.indexOf(slot), 1);
      });
      if (slotsAvailable.length === 0) {
        return (
          <div>
            <div>No Slots Available. Please select a different date</div>
            <p style={{ color: "red" }}>{errorMsg}</p>
          </div>
        );
      }
      return (
        <>
          {slotsAvailable.map((slot) => (
            <FormControlLabel
              key={slot}
              value={slot}
              control={<Radio color="primary" required />}
              label={slot}
            />
          ))}
        </>
      );
    } else {
      return <div>Select Date First</div>;
    }
  };
  return (
    <Container maxWidth="md" style={{ marginTop: "10px" }}>
      <Snackbar
        autoHideDuration={1000}
        open={snackbarStatus}
        onClose={handleSnackbarClose}
        message="Appointment Added"
      />
      <Card variant="outlined">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CardHeader title="Make an appointment" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={() => history.push("/lists")}
              style={{ margin: "1rem 1rem 0 1rem" }}
            >
              All Appointments
            </Button>
          </Grid>
        </Grid>

        <form onSubmit={onFormSubmit}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  required
                  onChange={onValueChange}
                  value={values.firstName}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="LastName"
                  name="lastName"
                  required
                  onChange={onValueChange}
                  value={values.lastName}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  required
                  onChange={onValueChange}
                  value={values.age}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  required
                  onChange={onValueChange}
                  value={values.address}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  name="email"
                  required
                  onChange={onValueChange}
                  value={values.email}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone number"
                  name="phone"
                  required
                  onChange={onValueChange}
                  value={values.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Appointment Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="date"
                  required
                  onChange={onValueChange}
                  value={values.date}
                />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h6" component="h6">
                  Available Slots
                </Typography>
                <hr />
                <RadioGroup
                  row
                  aria-label="gender"
                  name="slot"
                  onChange={onValueChange}
                  value={values.slot}
                >
                  {renderSlots(getSlots(data))}
                </RadioGroup>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  color="primary"
                  style={{ float: "right" }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </form>
      </Card>
    </Container>
  );
};

export default AppointmentForm;
