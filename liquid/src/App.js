import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import "./App.css";
import Home from "./views/Home";
import Nav from "./components/Nav";
import Single from "./views/Singe";
import Profile from "./views/Profile";
import Login from "./views/Login";
import Logout from "./views/Logout";
import {MediaProvider} from './contexts/MediaContext';
import {Container} from '@material-ui/core';
import Upload from './views/Upload';



const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <MediaProvider>
        <Container maxWidth="md">
        <Nav/>
        <main>
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/home" component={Home}/>
          <Route path="/profile" component={Profile}/>
          <Route path={'/logout'} component={Logout}/>
          <Route path="/single/:id" component={Single}/>
          <Route path={'/upload'} component={Upload}/>
        </Switch>
        </main>
        </Container>
      </MediaProvider>
      
    </Router>
  );
};

export default App;
