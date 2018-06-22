import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Gravatar from "react-gravatar";
import classNames from 'classnames';

import Styles from './style.css';

class Player extends Component {
  render() {
    const { name, mail } = this.props;
    return (
      <div className={classNames(Styles['player-container'])}>
        <Gravatar email={mail || name} size={100} className={classNames(Styles.gravatar)} />
        <span className="player-name">{name}</span>
      </div>
    );
  }
}

Player.propTypes = {
  name: PropTypes.string,
  mail: PropTypes.string.isRequired,
};

export default Player;