import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

const App = () => {
  const [loggedInStatus, setLoggedInStatus] = useState('Not logged in');
  const [user, setUser] = useState({});
  const handleLogin = (data) => {
    setLoggedInStatus('Logged in!');
    setUser(data.user);
  };

  return (
    <BrowserRouter>
      <Switch>
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
            <Home
              history={props.history}
              loggedInStatus={loggedInStatus}
              handleLogin={handleLogin}
              username={user ? user.username : ''}
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  history: PropTypes.instanceOf(Object),
};

App.defaultProps = {
  history: undefined,
};

export default App;
