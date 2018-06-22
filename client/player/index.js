import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Gravatar from "react-gravatar";

class Player extends Component {
  render() {
    const { name, mail } = this.props;
    return (
      <div>
        <Gravatar email={mail || name} />
      </div>
    );
  }
}

Player.propTypes = {
  name: PropTypes.string,
  mail: PropTypes.string.isRequired,
};

export default Player;