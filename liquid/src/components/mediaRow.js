import React, { useContext, useState, useEffect } from "react";
import { MediaContext } from "../contexts/MediaContext";
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
import { getAvatarImage } from "../hooks/ApiHooks";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import { deleteFile } from "../hooks/ApiHooks";

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
}));

const useStyles2 = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    height: 400,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  box: {
    padding: "5px 15px 5px 15px",
    display: "flex",
    flexDirection: "row",
  },
  review: {
    padding: "0px 0px 1px 3px",
    height: "10%",
    margin: 0,
  },
  action: {
    padding: "1px 2px 1px 2px",
  },
  icon: {
    fontSize: "20",
    padding: 0,
  },
}));

const MediaRow = ({ file, profile }) => {
  const [user] = useContext(MediaContext);
  const description = JSON.parse(file.description);
  const classes = useStyles();
  const classes2 = useStyles2();
  const [avatar, setAvatar] = useState([]);
  useEffect(() => {
    (async () => {
      if (user !== null) {
        setAvatar(await getAvatarImage(file.user_id));
      }
    })();
  }, [user]);
console.log('mikä täällä on rikki: ',file)
  if (profile !== true ){
    return (
      <>
        {user !== null && avatar.length > 0 && (
          <Card variant="outlined" color="primary">
            <CardHeader
              avatar={
                <Avatar
                  aria-label="avatar"
                  src={mediaUrl + avatar[0].filename}
                />
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
        )}
      </>
    );
  } else {
    console.log("ollaan elsessä");
    return (
      <>
        <Card variant="outlined" color="primary" className={classes2.root}>
          <CardMedia
            className={classes2.media}
            image={mediaUrl + file.thumbnails.w320}
            title={file.title}
          />
          <CardContent className={classes2.box}>
            <Typography variant="subtitle1" component="subtitle1">
              {file.title}
            </Typography>
          </CardContent>
          <CardActions disableSpacing className={classes2.action}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              className={classes2.actionBox}
            >
              <Grid item className={classes2.review}>
                <Typography>
                  {description.review && (
                    <subtitle1>{description.review}/5</subtitle1>
                  )}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label={`modify ${file.title}`}
                  component={RouterLink}
                  to={"/modify/" + file.file_id}
                  className={classes2.icon}
                >
                  <MoreVertIcon />
                </IconButton>
                <IconButton
                  aria-label={`delete file`}
                  className={classes2.icon}
                  onClick={() => {
                    const confirmOk = window.confirm('do you really wanna delete?');
                    if (confirmOk) {
                      deleteFile(file.file_id);
                    }
                  }}>
                  <DeleteForeverRoundedIcon />
                </IconButton>
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
