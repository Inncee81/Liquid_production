import React, {useContext, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';

const Logout = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useContext(MediaContext);

  useEffect(() => {
    setUser(null);
    localStorage.clear();
  }, [setUser]);

  return (
    <Redirect to={'/'}/>
  );
};

export default Logout;

