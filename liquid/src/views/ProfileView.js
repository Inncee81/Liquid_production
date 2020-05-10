import React, { useContext, useState, useEffect } from "react";
import { MediaContext } from "../contexts/MediaContext";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { getAvatarImage } from "../hooks/ApiHooks";
import ProfileForm from "../components/ProfileForm";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import MyTable from "../components/myTable";

const mediaUrl = "http://media.mw.metropolia.fi/wbma/uploads/";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 290,
  },
});

const ProfileView = () => {
  const [user] = useContext(MediaContext);
  const classes = useStyles();
  const [avatar, setAvatar] = useState([]);
  useEffect(() => {
    (async () => {
      if (user !== null) {
        setAvatar(await getAvatarImage(user.user_id));
      }
    })();
  }, [user]);

  const [toggle, setToggle] = useState(true);
  const showHide = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <h1>Profile</h1>
      {user !== null && avatar.length > 0 && (
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={mediaUrl + avatar[1].filename}
            title="profilePicture"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {user.username}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {user.email}
              <br></br>
              {user.full_name}
            </Typography>
          </CardContent>
        </Card>
      )}
      <h1>Favorite Games</h1>
      {toggle ? (
        <>
          <MyTable tag="liquidappfavorites" />
        </>
      ) : (
        <>
          <p>They haven't added any favorites!</p>
        </>
      )}
      <h1>Recently reviewed</h1>
      {toggle ? (
        <MyTable tag="liquidappReviews" />
      ) : (
        <p>They haven't reviewed anything yet!</p>
      )}
      <h1>Wishlist</h1>
      {toggle ? (
        <>
          <MyTable tag="liquidappwishlist" />
        </>
      ) : (
        <>
          <p>They haven't added anything on their wishlist!</p>
        </>
      )}
    </>
  );
};

export default ProfileView;
