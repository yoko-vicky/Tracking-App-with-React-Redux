import React, { useState } from 'react';
// import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
// import axios from 'axios';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

const App = () => {
  const [loggedInStatus, setLoggedInStatus] = useState('NOT_LOGGED_IN');
  const [user, setUser] = useState({});

  const handleLogin = (data) => {
    setLoggedInStatus('LOGGED_IN');
    setUser(data.user);
  };

  const handleLogout = () => {
    setLoggedInStatus('NOT_LOGGED_IN');
    setUser({});
  };

  // const checkLoginStatus = () => {
  //   axios
  //     .get('http://localhost:3001/logged_in', { withCredentials: true })
  //     .then((response) => {
  //       if (response.data.logged_in && loggedInStatus === 'NOT_LOGGED_IN') {
  //         setLoggedInStatus('LOGGED_IN');
  //         setUser(response.data.user);
  //       } else if (!response.data.logged_in && (loggedInStatus === 'LOGGED_IN')) {
  //         setLoggedInStatus('NOT_LOGGED_IN');
  //         setUser({});
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('check login error', error);
  //     });
  // };

  // useEffect(() => {
  //   checkLoginStatus();
  // });

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
              handleLogout={handleLogout}
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
