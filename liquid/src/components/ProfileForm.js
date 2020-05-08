import React, {useContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import useProfileUpdateForm from '../hooks/ProfileHooks';
import { checkUserAvailable, updateProfile, checkToken } from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';
import { MediaContext } from '../contexts/MediaContext';
import { Button, TextField, Grid, Snackbar} from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const ProfileForm = ({history}) => {
    const [user, setUser] = useContext(MediaContext);
    
    const doUpdateProfile = async() => {
        try {
        const token = localStorage.getItem('token');
        await updateProfile(inputs, token);
        const userData = await checkToken(token);
        setUser(userData);
            } catch (e) {
                alert(e.message);
            }
    };

    const [toggle, setToggle] = useState(true);
    const showHide = () => {
      setToggle(!toggle);
    };

    const {inputs, setInputs, handleInputChange, handleSubmit} =
        useProfileUpdateForm(user, doUpdateProfile);


    useEffect(() => {
        setInputs(user);
      ValidatorForm.addValidationRule("isAvailable", async (value) => {
        try {
          if (value !== user.username) {
            const response = await checkUserAvailable(value);
            return response.available;
          } else {
            return true;
          }
        } catch (e) {
          console.log(e.message);
          return true;
        }
      });
    }, [user, setInputs]);


    return (
        <> 
        {toggle ?
        <Grid container spacing={3}> 
            <Grid item xs={12}>
                <h1>Update information
                </h1>
            </Grid>
            <Grid item xs={12}>
                <ValidatorForm 
                 onSubmit={handleSubmit}
                 noValidate
                >
                    <Grid item={12}>
                        <TextValidator
                            fullWidth
                            id="standard-basic"
                            label="Username"
                            type="text"
                            name="username"
                            onChange={handleInputChange}
                            value={inputs.username}
                            validators={[
                                'isAvailable',
                                'required',
                                'minStringLength: 3',
                            ]}
                            errorMessages={[
                                ''+ inputs.username + ' is not available, yo',
                                'this field is required',
                                'minimum 3 characters',
                            ]}
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <TextValidator
                            fullWidth
                            id="standard-basic" 
                            label="Email"
                            type="email"
                            name="email"
                            onChange={handleInputChange}
                            value={inputs.email}
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth 
                            id="standard-basic" 
                            label="Full name"
                            type="text"
                            name="full_name"
                            onChange={handleInputChange}
                            value={inputs.full_name}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextValidator fullWidth 
                            id="standard-basic"
                            label="Password"
                            type="password"
                            name="password"
                            onChange={handleInputChange}
                            value={inputs.password}
                            validators={[
                                'required',
                                'minStringLength: 5',
                            ]}
                            errorMessages={[
                                'this field is required',
                                'minimum 5 characters',
                                'must contain one capital letter and a number',
                            ]}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth variant="outlined" color="primary" type="submit" onClick={showHide}>Update</Button>
                    </Grid>
                </ValidatorForm>
            </Grid>
        </Grid> :
        <p>Profile information Updated!</p>
}
        </>
    )
}

ProfileForm.propTypes = {
    history: PropTypes.object,
};

export default withRouter(ProfileForm);


