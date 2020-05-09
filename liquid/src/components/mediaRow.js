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
  }
}));

const MediaRow = ({ file, profiili }) => {
  const description = JSON.parse(file.description);
  const classes = useStyles();
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
            <Grid item
            className={classes.review}>
              <Typography>
                {description.review && <h3>{description.review}/5</h3>}
              </Typography>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
};

MediaRow.propTypes = {
  file: PropTypes.object,
  profiili: PropTypes.bool,
};

export default MediaRow;
