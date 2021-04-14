// import React, { useState } from 'react';
// import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
// import axios from 'axios';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

const App = () => {
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

  // const checkLoginStatus = () => {
  //   setStateToken(localStorage.getItem('token'));
  //   if (stateToken) {
  //   // tokenがある場合、
  //   // tokenを使って、apiに問い合わせ、
  //   // 現在のログインユーザー（セッション中のユーザー）と同じであれば（同じでない場合はあらためてログインが必要になる）
  //   // ログイン中、そうでなければログアウトさせる
  //     axios
  //       .get('http://localhost:3001/logged_in', {
  //         withCredentials: true,
  //         params: {
  //           token: stateToken,
  //         },
  //       })
  //       .then((response) => {
  //         // if (
  //         //   response.data.logged_in && this.state.loggedInStatus === 'NOT_LOGGED_IN'
  //         // ) {
  //         //   this.setState({
  //         //     loggedInStatus: 'LOGGED_IN',
  //         //     user: response.data.user,
  //         //   });
  //         // } else if (
  //         //   !response.data.logged_in && (this.state.loggedInStatus === 'LOGGED_IN')
  //         // ) {
  //         //   this.setState({
  //         //     loggedInStatus: 'NOT_LOGGED_IN',
  //         //     user: {},
  //         //   });
  //         // }
  //         console.log(response);
  //         console.log(user);
  //       })
  //       .catch((error) => {
  //         console.log('check login error', error);
  //       });
  //   } else {
  //     handleLogout();
  //   }
  // };

  // useEffect(() => checkLoginStatus(), [stateToken]);

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
