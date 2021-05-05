import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BiTargetLock } from 'react-icons/bi';
import { AiTwotoneMail, AiFillSetting } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import thumbPic from '../assets/images/bw-m.jpg';

const More = ({ loginUser, userName }) => (loginUser ? (
  <div className="more">
    <h1 className="heading">More</h1>
    <div className="more__content">
      <div className="more__header">
        <div className="more__header__wrapper">
          <div className="more__thumb">
            <img src={thumbPic} alt={userName} className="more__thumb__image" />
          </div>
          <div className="more__names">
            <div className="more__names__name">{userName}</div>
            <div className="more__names__text">
              I am brushing up my spoken English!
            </div>
          </div>
        </div>
      </div>
      <div className="more__items">
        <Link className="more__link" to="/more">
          <BiTargetLock />
          Your goal
        </Link>
        <Link className="more__link" to="/more">
          <AiTwotoneMail />
          Mailing List
        </Link>
        <Link className="more__link" to="/more">
          <FaUserAlt />
          Your profile
        </Link>
        <Link className="more__link" to="/more">
          <AiFillSetting />
          Settings
        </Link>
        <Link className="more__link" to="/more">
          <BsFillInfoCircleFill />
          Help
        </Link>
      </div>
    </div>
  </div>
) : <Redirect to="/" />);

const mapStateToProps = (state) => ({
  loginUser: state.user.logIn,
  userName: state.user.user.username,
});

More.propTypes = {
  loginUser: PropTypes.bool.isRequired,
  userName: PropTypes.string,
};

More.defaultProps = {
  userName: 'Anonymous',
};

export default connect(mapStateToProps)(More);
