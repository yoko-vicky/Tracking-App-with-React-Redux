import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import AddTrack from '../pages/AddTrack';
import EditTrack from '../pages/EditTrack';
import TrackList from '../pages/TrackList';
import TrackItem from '../pages/TrackItem';
import Progress from '../pages/Progress';
import More from '../pages/More';
import AdminHome from '../admin_views/AdminHome';
import AdminAddItem from '../admin_views/AdminAddItem';
import AdminEditItem from '../admin_views/AdminEditItem';

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
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Home loggedInStatus={loggedInStatus} handleLogout={handleLogout} username={user ? user.username : ''} />
              )}
            />
            <Route
              exact
              path="/login"
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
              path="/signup"
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
            <Route exact path="/track/create" component={AddTrack} />
            <Route exact path="/track/:id" component={TrackItem} />
            <Route exact path="/track/:id/edit" component={EditTrack} />
            <Route exact path="/tracks" component={TrackList} />
            <Route exact path="/progress" component={Progress} />
            <Route exact path="/more" component={More} />
            <Route exact path="/admin" component={AdminHome} />
            <Route exact path="/admin/item/create" component={AdminAddItem} />
            <Route exact path="/admin/item/:id" component={AdminEditItem} />
            <Route component={NotFound} />
          </Switch>
        </div>
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
