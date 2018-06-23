import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Gravatar from 'react-gravatar';
import classNames from 'classnames';

import Styles from './style.css';

class Player extends Component {
  getMainDOM() {
    if (this.props.isEditable) {
      const {
        handleEdit,
        rowIndex,
        mail,
        name,
        handleRemove,
        isEmpty,
      } = this.props;
      const changeMail = e => handleEdit(rowIndex, 'mail', e.target.value);
      const changeName = e => handleEdit(rowIndex, 'name', e.target.value);
      const remove = () => handleRemove(rowIndex);

      return (
        <span className={classNames(Styles.inputContainer)}>
          <input 
            className={classNames(Styles.playerInput)} 
            onChange={changeMail} 
            placeholder="Enter mail"
            type="text" 
            value={mail} 
          />
          <input 
            className={classNames(Styles.playerInput)} 
            onChange={changeName} 
            placeholder="Enter name"
            type="text" 
            value={name} 
          />
          {!isEmpty && <button 
            className={classNames(Styles.removeButton)}
            onClick={remove}
          >Remove</button>}
        </span>
      );
    }

    const { results, name, mail } = this.props;
    return (
      <span className={classNames(Styles.playingContainer)}>
        <span>{name || mail}</span>
        {!!results && (
          <span className={classNames(Styles.results)}>({results})</span>
        )}
      </span>
    );
  }

  render() {
    const { isActive, name, mail, results, isEditable } = this.props;

    return (
      <div
        className={classNames(Styles['player-container'], {
          [Styles.activePlayer]: isActive,
          [Styles.isEditing]: isEditable
        })}
      >
        <Gravatar
          email={mail || name}
          size={100}
          className={classNames(Styles.gravatar)}
        />
        {this.getMainDOM()}
      </div>
    );
  }
}

Player.propTypes = {
  isActive: PropTypes.bool,
  isEditable: PropTypes.bool,
  isEmpty: PropTypes.bool,
  handleEdit: PropTypes.func,
  handleRemove: PropTypes.func,
  mail: PropTypes.string.isRequired,
  name: PropTypes.string,
  rowIndex: PropTypes.number,
  results: PropTypes.number,
};

Player.defaultProps = {
  isEditable: false,
  mail: '',
  name: '',
};

export default Player;
