import React from 'react';
import PropTypes from 'prop-types';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Button} from '@material-ui/core';
import {withRouter} from 'react-router-dom';


const BackButton = ({history}) => {
  return (
    <Button
      startIcon={<ArrowBackIcon/>}
      onClick={() => {
        history.goBack();
      }}
    >
      Back
    </Button>
  );
};


BackButton.propTypes = {
  history: PropTypes.object,
};

export default withRouter(BackButton);
