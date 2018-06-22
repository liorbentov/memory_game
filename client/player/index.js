import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Gravatar from "react-gravatar";
import classNames from 'classnames';

import Styles from './style.css';

class Player extends Component {
  render() {
    const { isActive, name, mail, results } = this.props;
    return (
      <div className={classNames(Styles['player-container'], { [Styles.activePlayer]: isActive })}>
        <Gravatar email={mail || name} size={100} className={classNames(Styles.gravatar)} />
        <span>{name}</span>
        <span className={classNames(Styles.results)}>({results})</span>
      </div>
    );
  }
}

Player.propTypes = {
  isActive: PropTypes.bool,
  mail: PropTypes.string.isRequired,
  name: PropTypes.string,
  results: PropTypes.number,
};

export default Player;