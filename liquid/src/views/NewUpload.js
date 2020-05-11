import React from "react";
import {
  Grid,
  Button,
  makeStyles,
  Typography,
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
  container: {
    paddingTop: "20%",
    paddingBottom: "20%",
  },
}));

const NewUpload = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={2}>
      <Backbutton />
      <Grid
        container
        className={classes.container}
        direction="column"
        justify="space-evenly"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12}>
          <Typography>
            <h3>What do you want to post?</h3>
          </Typography>
        </Grid>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <Button
            component={RouterLink}
            to="/addwish"
            variant="outlined"
            startIcon={<AddRoundedIcon />}
            color="primary"
          >
            Add Games to your wishlist
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            component={RouterLink}
            to="/addfavorite"
            variant="outlined"
            startIcon={<AddRoundedIcon />}
            color="primary"
          >
            Add new favorite games
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            component={RouterLink}
            to="/upload"
            variant="outlined"
            startIcon={<AddRoundedIcon />}
            color="primary"
          >
            Upload any Media
          </Button>
        </Grid>
      </Grid>
      <Backbutton />
    </Grid>
  );
};

export default NewUpload;
