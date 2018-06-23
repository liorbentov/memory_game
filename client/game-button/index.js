import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from '@reach/router';

import Styles from './style.css';

class GameButton extends Component {
  render() {
    return (
      <Link
        className={classNames(Styles.gameButton)}
        to={`/games/${this.props.id}`}
        state={{ teamId: this.props.teamId }}
      >
        <h3>{this.props.name}</h3>
        <h5>{this.props.description}</h5>
      </Link>
    );
  }
}

GameButton.propType = {
  description: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.shape({
    rows: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired,
  }),
};

export default GameButton;
