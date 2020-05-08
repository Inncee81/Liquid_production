import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useCommentForm from '../hooks/CommentHooks';
import { postComment } from '../hooks/ApiHooks';
import {
    Grid,
    Button,
    TextField,
    CircularProgress,
} from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';

const CommentForm = ({ history, id }) => {
    const [loading, setLoading] = useState(false);
    const doComment = async () => {
        setLoading(true);
        console.log('inputs', inputs);
        try {
            const result = await postComment(localStorage.getItem('token'), id, inputs)
            console.log("kommentti result", result);
                setLoading(false);
            } catch(e) {
                console.log(e.message);
            };
        };
    

    const { inputs, handleInputChange, handleSubmit} = useCommentForm(doComment);


    return (
        <>
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <ValidatorForm
                        onSubmit={handleSubmit}
                        instantValidate={false}
                        noValidate
                    >
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="outlined-multiline-static"
                                    label="Description"
                                    name="comment"
                                    value={inputs.comment}
                                    onChange={handleInputChange}
                                    multiline
                                    rows={4}
                                    defaultValue="Default Value"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    color="primary"
                                    variant="contained"
                                    type="submit">Comment!</Button>
                            </Grid>
                    </ValidatorForm>
                    {loading &&
                        <Grid item xs={12}>
                            <CircularProgress color="secondary" />
                        </Grid>
                    }
                </Grid>
            </Grid>
        </>
    );
}

CommentForm.propTypes = {
    history: PropTypes.object,
    id: PropTypes.number,
};

export default CommentForm;

