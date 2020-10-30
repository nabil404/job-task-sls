import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@material-ui/core";

const AppointmentList = () => {
  const history = useHistory();
  const [data, setData] = useState([]);

  const fetchClientData = () => {
    if (localStorage.getItem("AppointmentData")) {
      const fetchedData = localStorage.getItem("AppointmentData");
      setData(JSON.parse(fetchedData));
    }
  };

  useEffect(() => {
    fetchClientData();
  }, []);

  const renderTable = () => {
    if (data.length !== 0) {
      return (
        <TableBody>
          {data.map(
            ({
              id,
              date,
              firstName,
              lastName,
              age,
              email,
              phone,
              address,
              slot,
            }) => (
              <TableRow key={id}>
                <TableCell>{date}</TableCell>
                <TableCell align="right">{slot}</TableCell>
                <TableCell align="right">{firstName}</TableCell>
                <TableCell align="right">{lastName}</TableCell>
                <TableCell align="right">{age}</TableCell>
                <TableCell align="right">{email}</TableCell>
                <TableCell align="right">{phone}</TableCell>
                <TableCell align="right">{address}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      );
    }
  };

  return (
    <TableContainer
      component={Container}
      maxWidth="lg"
      style={{ marginTop: "10px" }}
    >
      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={() => history.push("/")}
      >
        Make an appointment
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Time Slot</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Address</TableCell>
          </TableRow>
        </TableHead>
        {renderTable()}
      </Table>
    </TableContainer>
  );
};

export default AppointmentList;
