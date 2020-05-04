import React, {useContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import useSignUpForm from '../hooks/RegisterHooks';
import { register, login, checkUserAvailable } from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';
import { MediaContext } from '../contexts/MediaContext';
import { Button, TextField, Grid } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const RegisterForm = ({history}) => {
    const [user, setUser] = useContext(MediaContext);
    

    const doRegister = async() => {
        try {
        delete inputs.confirm;
        await register(inputs);
        const userData = await login(inputs);
        setUser(userData.user);
        // tallennatoken
        localStorage.setItem('token', userData.token);
        history.push('/home');
            } catch (e) {
                alert(e.message);
            }
        
       
    };
        // kirjaudu automagisetsti
        // siirrttsy etsusivulletss

    const {inputs, handleInputChange, handleSubmit} = useSignUpForm(doRegister);

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
          console.log(value);
          if (value !== inputs.password) {
            return false;
          }
          return true;
        });

        ValidatorForm.addValidationRule('isAvailable', async (value) => {
            try {
                const response = await checkUserAvailable(value);
                return response.available; 
            } catch (e) {
                return true; 
            }
        });

    }, [inputs]);

    return (
        <> 
        <Grid container spacing={3}> 
            <Grid item xs={12}>
                <h1 class="spinning">Register</h1>
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
                        <TextValidator fullWidth
                            label="Repeat password"
                            onChange={handleInputChange}
                            name="confirm"
                            type="password"
                            validators={['isPasswordMatch', 'required']}
                            errorMessages={['password mismatch', 'this field is required']}
                            value={inputs.confirm}
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
                        <Button fullWidth variant="outlined" color="primary" type="submit">Register</Button>
                    </Grid>
                </ValidatorForm>
            </Grid>
        </Grid>
        
        </>
    )
}

RegisterForm.propTypes = {
    history: PropTypes.object,
};

export default withRouter(RegisterForm);


