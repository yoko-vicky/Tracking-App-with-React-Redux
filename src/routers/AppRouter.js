import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import AddTrack from '../pages/AddTrack';
import TrackList from '../pages/TrackList';
import Progress from '../pages/Progress';
import More from '../pages/More';

const AppRouter = () => {
  const [loggedInStatus, setLoggedInStatus] = useState('NOT_LOGGED_IN');
  const [user, setUser] = useState({});
  // const [stateToken, setStateToken] = useState('');
  const [, setStateToken] = useState('');

  const handleLogin = (data) => {
    setLoggedInStatus('LOGGED_IN');
    setUser(data.user);
    setStateToken(data.token);
    localStorage.setItem('token', data.token);
  };

  const handleLogout = () => {
    setLoggedInStatus('NOT_LOGGED_IN');
    setUser({});
    setStateToken('');
    localStorage.removeItem('token');
  };

  return (
    <BrowserRouter>
      <div className="whole-container">
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home loggedInStatus={loggedInStatus} />
            )}
          />
          <Route
            exact
            path="/dashboard"
            render={() => (
              <Dashboard
                loggedInStatus={loggedInStatus}
                username={user ? user.username : ''}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={(props) => (
              <Login
                history={props.history}
                loggedInStatus={loggedInStatus}
                handleLogin={handleLogin}
                username={user ? user.username : ''}
                handleLogout={handleLogout}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={(props) => (
              <Signup
                history={props.history}
                loggedInStatus={loggedInStatus}
                handleLogin={handleLogin}
                username={user ? user.username : ''}
                handleLogout={handleLogout}
              />
            )}
          />
          <Route path="/add_track" component={AddTrack} />
          <Route path="/track_list" component={TrackList} />
          <Route path="/progress" component={Progress} />
          <Route path="/more" component={More} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

AppRouter.propTypes = {
  history: PropTypes.instanceOf(Object),
};

AppRouter.defaultProps = {
  history: undefined,
};
export default AppRouter;
