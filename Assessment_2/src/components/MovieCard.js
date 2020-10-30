import React from "react";
import { Card, Typography } from "@material-ui/core";
import NoImage from "./No_image_available.png";

const MovieCard = (props) => {
  return (
    <Card style={{ height: "400px", width: "100%" }}>
      <Typography color="primary" variant="h6" align="center">
        {props.Title}
      </Typography>
      <div style={{ height: "380px", textAlign: "center" }}>
        <img
          src={props.Poster === "N/A" ? NoImage : props.Poster}
          alt="poster"
          style={{
            height: "auto",
            width: "200px",
            objectFit: "contain",
          }}
        />
        <Typography color="primary" variant="h6" align="center">
          {props.Year}
        </Typography>
      </div>
    </Card>
  );
};

export default MovieCard;
