import React, { useContext } from "react";
import PropTypes from "prop-types";
import useLoginForm from "../hooks/LoginHooks";
import { login } from "../hooks/ApiHooks";
import { MediaContext } from "../contexts/MediaContext";
import { Button, TextField, Grid, Typography, makeStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: "20%",
  }
}));

const LoginForm = ({ history }) => {
  const classes = useStyles();
  const [user, setUser] = useContext(MediaContext);
  const doLogin = async () => {
    try {
      const userData = await login(inputs);
      setUser(userData.user);
      // tallennatoken
      localStorage.setItem("token", userData.token);
      history.push("/home");
    } catch (e) {
      console.log(e.message);
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useLoginForm(doLogin);
  return (
    <>
      <Grid
        xs={12}
        container
        spacing={3}
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.container}
      >
        <Grid item xs={12}>
          <Typography component="h2" variant="h3">
            Login
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="standard-basic"
                  label="Username"
                  type="text"
                  name="username"
                  onChange={handleInputChange}
                  value={inputs.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="standard-basic"
                  label="Password"
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                  value={inputs.password}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  type="submit"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

LoginForm.propTypes = {
  history: PropTypes.object,
};

export default withRouter(LoginForm);
