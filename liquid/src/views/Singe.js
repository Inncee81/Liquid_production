import React from "react";
import PropTypes from "prop-types";
import { useSingleMedia, useComments } from "../hooks/ApiHooks";
import Backbutton from "../components/Backbutton";
import Media from "../components/Media";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CommentForm from "../components/CommentForm";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 290,
  },
  title: {
    width: "50%",
  }
});

const Single = ({ match, history }) => {
  console.log("match", match.params.id);
  const classes = useStyles();
  const file = useSingleMedia(match.params.id);
  let description = undefined;
  if (file !== null) {
    description = JSON.parse(file.description);
  }
  const commentsArray = useComments(
    match.params.id,
    localStorage.getItem("token")
  );
  console.log("single file", file);

  return (
    <>
      {file !== null && (
        <>
          <Backbutton />
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Card className={classes.root}>
                <CardHeader
                  title={
                    file.user ? file.user.username : "login to see userdata"
                  }
                />
                <CardMedia>
                  <Media width="50%" file={file} description={description} />
                </CardMedia>
                <CardContent>
                  {description && (
                    <Grid
                      container
                      spacing={1}
                      direction="column"
                      justify="center"
                    >
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                      >
                        <Grid item xs={12} className={classes.title}>
                          <Typography variant="body2">{file.title}</Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}></Grid>
                      <Grid item xs={12}>
                        <body2>{description.desc}</body2>
                      </Grid>
                    </Grid>
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <div style={{ overflow: "scroll", height: "45vh" }}>
                {commentsArray.map((item) => (
                  <div>
                    <h4>{item.user}: </h4>
                    <p>{item.comment}</p>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              <CommentForm id={parseInt(match.params.id)} />
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
