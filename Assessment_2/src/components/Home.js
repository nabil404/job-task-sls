import React, { useState } from "react";
import { Container, Grid, Button, TextField } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import MovieCard from "./MovieCard";

const Home = () => {
  const [searchData, setSearchData] = useState("");
  const [movies, setMovies] = useState({});

  const handleSeachField = (e) => {
    setSearchData(e.target.value);
  };

  const handleSearchButton = (e) => {
    e.preventDefault();
    axios
      .get(`http://www.omdbapi.com/?apikey=80226943&s=${searchData}`)
      .then((response) =>
        setMovies({
          ...response.data,
        })
      );
  };

  const handlePageChange = (e, pageNumber) => {
    axios
      .get(
        `http://www.omdbapi.com/?apikey=80226943&s=${searchData}&page=${pageNumber}`
      )
      .then((response) =>
        setMovies({
          ...response.data,
        })
      );
  };

  const renderResult = () => {
    if (movies.Search) {
      return (
        <>
          {movies.Search.map((movie) => (
            <Grid item xs={12} sm={6} md={3} key={movie.imdbID}>
              <MovieCard {...movie} />
            </Grid>
          ))}

          <Grid item sm={12}>
            <Pagination
              count={Math.ceil(movies.totalResults / 10)}
              variant="outlined"
              shape="rounded"
              onChange={(e, pageNumber) => handlePageChange(e, pageNumber)}
            />
          </Grid>
        </>
      );
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "10px" }}>
      <div style={{ textAlign: "center" }}>
        <form onSubmit={handleSearchButton}>
          <TextField onChange={handleSeachField} style={{ width: "40vw" }} />{" "}
          &nbsp;
          <Button
            color={"primary"}
            variant="contained"
            size="small"
            type="submit"
          >
            Search
          </Button>
        </form>
      </div>
      <br />
      <Grid container spacing={2}>
        {renderResult()}
      </Grid>
    </Container>
  );
};

export default Home;
