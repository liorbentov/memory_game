import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Gravatar from "react-gravatar";
import classNames from 'classnames';

import Styles from './style.css';

class Player extends Component {
  getMainDOM() {
    if (this.props.isEditable) {
      const { handleEdit, rowIndex, mail, name } = this.props;
      const changeMail = e => handleEdit(rowIndex, 'mail', e.target.value);
      const changeName = e => handleEdit(rowIndex, 'name', e.target.value);

      return (
        <span>
          <input type="text" value={mail} onChange={changeMail} />
          <input type="text" value={name} onChange={changeName} />
        </span>
      )
    }

    const { results, name } = this.props;
    return (
      <span>
        <span>{name}</span>
        { results && <span className={classNames(Styles.results)}>({results})</span> }
      </span>
    )
  }

  render() {
    const { isActive, name, mail, results } = this.props;

    return (
      <div className={classNames(Styles['player-container'], { [Styles.activePlayer]: isActive })}>
        <Gravatar email={mail || name} size={100} className={classNames(Styles.gravatar)} />
        { this.getMainDOM() }
      </div>
    );
  }
}

Player.propTypes = {
  isActive: PropTypes.bool,
  isEditable: PropTypes.bool,
  handleEdit: PropTypes.func,
  mail: PropTypes.string.isRequired,
  name: PropTypes.string,
  rowIndex: PropTypes.number,
  results: PropTypes.number,
};

Player.defaultProps = {
  isEditable: false,
  mail: '',
  name: '',
}

export default Player;