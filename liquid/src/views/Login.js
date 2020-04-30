import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Button} from '@material-ui/core';

const Login = () => {
  const [toggle, setToggle] = useState(true);
  const showHide = () => {
    setToggle(!toggle);
  };
  return (
    <>
      {toggle ? 
      <LoginForm/> :
      <RegisterForm/>
    }
    <Button onClick={showHide}>
      {toggle ? 'Sign up' : 'Login'}
    </Button> 
    </>
  );
};

export default Login;