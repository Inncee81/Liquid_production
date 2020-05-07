import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { Button, Grid } from '@material-ui/core';

const Login = () => {
  const [toggle, setToggle] = useState(true);
  const showHide = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <Grid
        container
        spacing={3}
        direction="column"
        justify="center"
        alignItems="center"
      >
        {toggle ? <LoginForm /> : <RegisterForm />}
        <Button onClick={showHide} color="secondary">
          {toggle ? "Sign up" : "Login"}
        </Button>
      </Grid>
    </>
  );
};

export default Login;