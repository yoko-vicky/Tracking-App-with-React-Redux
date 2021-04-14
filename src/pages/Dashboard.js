import React from 'react';
import PropTypes from 'prop-types';

const Dashboard = ({ loggedInStatus, username }) => (
  <div>
    <h1 className="heading">Dashboard</h1>
    <div className="content">
      <h2>
        Logged In Status:
        {loggedInStatus === 'LOGGED_IN' ? `Hi ${username}, You are now ${loggedInStatus}` : loggedInStatus }
      </h2>
    </div>
  </div>
);

Dashboard.propTypes = {
  loggedInStatus: PropTypes.string,
  username: PropTypes.string,
};

Dashboard.defaultProps = {
  loggedInStatus: '',
  username: '',
};

export default Dashboard;
