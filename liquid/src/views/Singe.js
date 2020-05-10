import React from "react";
import PropTypes from "prop-types";
import { useSingleMedia, useComments } from "../hooks/ApiHooks";
import Backbutton from "../components/Backbutton";
import Media from "../components/Media";
import { Grid, } from "@material-ui/core";
import CommentForm from '../components/CommentForm';

const Single = ({ match, history }) => {
  console.log("match", match.params.id);
  const file = useSingleMedia(match.params.id);
  let description = undefined;
  if (file !== null) {
    description = JSON.parse(file.description);
  }
  const commentsArray = useComments(match.params.id, localStorage.getItem('token'));
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
                  <div style={{overflow:'scroll', height:'45vh'}}>
        {
          commentsArray.map((item) =>
          <div>
            <h4>{item.user}: </h4>
          <p>{item.comment}</p>
          </div>
          )
        }
      </div>
                  <CommentForm id={parseInt(match.params.id)} />
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
