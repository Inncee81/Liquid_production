import React from "react";
import MediaTable from "../components/mediaTable";
import { Grid } from "@material-ui/core";

const Home = () => {
  return (
    <>
      <Grid
        container
        spacing={1}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <h1>Home</h1>
        <MediaTable profiili={true} />
      </Grid>
    </>
  );
};

export default Home;
