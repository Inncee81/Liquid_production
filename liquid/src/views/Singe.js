import React from "react";
import PropTypes from "prop-types";
import { useSingleMedia } from "../hooks/ApiHooks";
import Backbutton from "../components/Backbutton";
import Media from "../components/Media";
import { ValidatorForm } from "react-material-ui-form-validator";
import { Grid, Button, TextField, CircularProgress } from "@material-ui/core";

const Single = ({ match, history }) => {
  console.log("match", match.params.id);
  const file = useSingleMedia(match.params.id);
  let description = undefined;
  if (file !== null) {
    description = JSON.parse(file.description);
  }
  console.log("single file", file);

  return (
    <>
      {file !== null && (
        <>
          <Backbutton />
          <Grid>
            <Grid>
              <h1>{file.title}</h1>
            </Grid>
            <Grid>
              {description && (
                <Grid container spacing={1} direction="column" justify="center">
                  <Grid item xs={12}>
                    <h2>
                      {file.user ? file.user.username : "login to see userdata"}{" "}
                    </h2>
                  </Grid>
                  <Grid item xs={12}>
                    <Media file={file} description={description} />
                  </Grid>
                  <Grid item xs={12}>
                    <h4>{description.desc}</h4>
                  </Grid>
                  <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="Add comment"
                            multiline
                            rows={4}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            fullWidth
                            color="primary"
                            variant="contained"
                            type="submit"
                          >
                            Send
                          </Button>
                        </Grid>
                      </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </>
      )}
      <Backbutton />
    </>
  );
};

Single.propTypes = {
  match: PropTypes.object,
};

export default Single;
