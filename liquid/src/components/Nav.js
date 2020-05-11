import React, {useContext, useEffect} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {checkToken} from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {MediaContext} from '../contexts/MediaContext';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Typography,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AddPhotoAlternateRoundedIcon from "@material-ui/icons/AddPhotoAlternateRounded";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: "200px",
  }
}));

const Nav = ({history}) => {
  const classes = useStyles();
  const [user, setUser] = useContext(MediaContext);
  const [open, setOpen] = React.useState(false);
  const matches = useMediaQuery("(min-width:697px)");

  const toggleDrawer = (opener) => () => {
    setOpen(opener);
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userdata = await checkToken(localStorage.getItem('token'));
        console.log(userdata);
        setUser(userdata);
        history.push('/home');
      } catch (e) {
        // send to login
        history.push('/');
      }
    };

    checkUser();
  }, [history, setUser]);

  return (
    <>
      <AppBar style={{ background: "#444F51" }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Liquid
          </Typography>
          {user === null ? (
            " "
          ) : (
            <Button
              color="inherit"
              startIcon={<AddBoxRoundedIcon />}
              component={RouterLink}
              to="/newpost"
            >
              New post
            </Button>
          )}
          {user === null ? (
            <Button
              color="inherit"
              startIcon={<ExitToAppIcon />}
              component={RouterLink}
              to="/"
            >
              Login
            </Button>
          ) : (
            <Button
              color="inherit"
              startIcon={<ExitToAppIcon />}
              component={RouterLink}
              to="/logout"
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        className={classes.drawer}
      >
        <List>
          <ListItem
            button
            component={RouterLink}
            onClick={toggleDrawer(false)}
            to="/home"
          >
            <ListItemIcon>
              <HomeIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          {user !== null && (
            <>
              <ListItem
                button
                component={RouterLink}
                onClick={toggleDrawer(false)}
                to="/profile"
              >
                <ListItemIcon>
                  <AccountBoxIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                onClick={toggleDrawer(false)}
                to="/newpost"
              >
                <ListItemIcon>
                  <AddPhotoAlternateRoundedIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="New Post" />
              </ListItem>
              {user === null ? (
                <ListItem
                  button
                  component={RouterLink}
                  onClick={toggleDrawer(false)}
                  to="/login"
                >
                  <ListItemIcon>
                    <ExitToAppIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItem>
                ) : (
                  <ListItem
                  button
                  component={RouterLink}
                  onClick={toggleDrawer(false)}
                  to="/logout"
                >
                  <ListItemIcon>
                    <ExitToAppIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              )}
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

Nav.propTypes = {
  history: PropTypes.object,
};


export default withRouter(Nav);
