import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import useLoginForm from '../hooks/LoginHooks';
import { login } from '../hooks/ApiHooks';
import { MediaContext } from '../contexts/MediaContext';
import { Button, TextField, Grid } from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { cyan, purple } from '@material-ui/core/colors/cyan';

/*const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: cyan,
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});
*/
const LoginForm = ({history}) =>{
    const [user, setUser] = useContext(MediaContext);
    const doLogin = async () => {
        try {
            const userData = await login(inputs);
            setUser(userData.user);
            // tallennatoken
            localStorage.setItem('token', userData.token);
            history.push('/home');
        } catch (e) {
            console.log(e.message);
        }
    };

    const { inputs, handleInputChange, handleSubmit } = useLoginForm(doLogin);
    return (
      <>
        <Grid container>
          <Grid item xs={12}>
            <h1 class="spinning">Login</h1>
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
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
            </form>
          </Grid>
        </Grid>
      </>
    );
}

LoginForm.propTypes = {
    history: PropTypes.object,
};

export default withRouter(LoginForm);

