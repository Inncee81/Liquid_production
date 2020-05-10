import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import {
  Typography,
  IconButton,
  makeStyles,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
} from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import FavoriteIcon from "@material-ui/icons/Favorite";

const mediaUrl = "http://media.mw.metropolia.fi/wbma/uploads/";

const useStyles = makeStyles((theme) => ({
  root300: {
    maxWidth: 600,
    height: 550,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  box: {
    padding: "5px 15px 5px 15px",
  },
  review: {
    padding: "0px 5px 0px 0px",
  },
  action: {
    padding: "8px 10px 8px 10px"
  },
  media2: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  box2: {
    padding: "5px 15px 5px 15px",
    display: "flex",
    flexDirection: "row",
  },
  review2: {
    padding: "0px 5px 0px 0px",
  },
  action2: {
    padding: "1px 2px 1px 2px"
  },
  icon2: {
    fontSize: "20",
  }
}));

const MediaRow = ({ file, profile }) => {
  const description = JSON.parse(file.description);
  const classes = useStyles();
  if (profile !== true ){
    return (
      <>
        <Card variant="outlined" color="primary">
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings" color="primary">
                <MoreVertIcon />
              </IconButton>
            }
            title={file.user}
          />
          <CardMedia
            className={classes.media}
            image={mediaUrl + file.thumbnails.w320}
            title={file.title}
          />
          <CardContent className={classes.box}>
            <Typography variant="h6" component="p">
              {file.title}
            </Typography>
            <Typography variant="body2" component="p">
              {description.desc}
            </Typography>
          </CardContent>
          <CardActions disableSpacing className={classes.action}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <IconButton aria-label="like">
                  <FavoriteIcon />
                </IconButton>
                <IconButton
                  aria-label={`info about ${file.title}`}
                  component={RouterLink}
                  to={"/single/" + file.file_id}
                  className={classes.icon}
                >
                  <InfoIcon />
                </IconButton>
              </Grid>
              <Grid item className={classes.review}>
                <Typography>
                  {description.review && <h3>{description.review}/5</h3>}
                </Typography>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </>
    );
  } else {
    console.log("ollaan elsessä");
    return (
      <>
        <Card variant="outlined" color="primary">
          <CardMedia
            className={classes.media2}
            image={mediaUrl + file.thumbnails.w320}
            title={file.title}
          />
          <CardContent className={classes.box2}>
            <Typography variant="body2" component="p">
              {file.title}
            </Typography>
          </CardContent>
          <CardActions disableSpacing className={classes.action2}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              className={classes.actionBox}
            >
              <Grid item>
                <IconButton
                  aria-label={`info about ${file.title}`}
                  component={RouterLink}
                  to={"/single/" + file.file_id}
                  className={classes.icon2}
                >
                  <InfoIcon />
                </IconButton>
              </Grid>
              <Grid item className={classes.review2}>
                <Typography>
                  {description.review && <h3>{description.review}/5</h3>}
                </Typography>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </>
    );};
};

MediaRow.propTypes = {
  file: PropTypes.object,
  profile: PropTypes.bool,
};

export default MediaRow;
