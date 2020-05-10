import React from "react";
import {
  Grid,
  Button,
  GridList,
  GridListTile,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Backbutton from "../components/Backbutton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    width: "100%",
    height: "100%",
  },
  icon: {
    color: "rgba(0, 150, 136, 0.6)",
  },
}));

const NewUpload = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={2}>
      <Backbutton />
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Button
            component={RouterLink}
            to="/addreview"
            variant="outlined"
            startIcon={<AddRoundedIcon />}
            color="primary"
          >
            Rate a game
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={RouterLink}
            to="/addwish"
            variant="outlined"
            startIcon={<AddRoundedIcon />}
            color="primary"
          >
            Add Games
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={RouterLink}
            to="/upload"
            variant="outlined"
            startIcon={<AddRoundedIcon />}
            color="primary"
          >
            Upload Media
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewUpload;
