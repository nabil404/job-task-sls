import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5">Appointment</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
