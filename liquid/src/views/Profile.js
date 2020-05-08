import React, { useContext, useState, useEffect } from "react";
import { MediaContext } from "../contexts/MediaContext";
import {
  Card,
  CardMedia,
  Button,
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

const Profile = () => {
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
      {toggle ? (
        <Button onClick={showHide} color="secondary">
          Update profile
        </Button>
      ) : (
        <ProfileForm />
      )}
      <Button component={RouterLink} to="/uploadprofilepic" color="secondary">
        Update profile picture
      </Button>
      <h1>Favorite Games</h1>
      {toggle ? (
        <>
          <MyTable tag="liquidappfavorites" profiili={true}/>
        </>
      ) : (
        <>
          <p>You haven't added anything here!</p>
        </>
      )}
      <Button
        component={RouterLink}
        to="/addfavorite"
        onClick={showHide}
        variant="outlined"
        className={classes.button}
        startIcon={<AddRoundedIcon />}
        color="primary"
      >
        Add Games
      </Button>
      <h1>Recently reviewed</h1>
      {toggle ? (
        <MyTable tag="liquidappReviews" profiili={true}/>
      ) : (
        <p>You haven't reviewed anything yet!</p>
      )}
      <Button
        component={RouterLink}
        to="/addreview"
        onClick={showHide}
        variant="outlined"
        className={classes.button}
        startIcon={<AddRoundedIcon />}
        color="primary"
      >
        Rate a game
      </Button>
      <h1>Wishlist</h1>
      {toggle ? (
        <>
          <MyTable tag="liquidappwishlist" profiili={true}/>
        </>
      ) : (
        <>
          <p>You haven't added anything here!</p>
        </>
      )}
      <Button
        component={RouterLink}
        to="/addwish"
        onClick={showHide}
        variant="outlined"
        className={classes.button}
        startIcon={<AddRoundedIcon />}
        color="primary"
      >
        Add Games
      </Button>
    </>
  );
};

export default Profile;
