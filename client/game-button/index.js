import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Styles from './styles.css';

class GameButton extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		console.log(this.props.id);
	}

	render() {
		return (
			<button className={classNames(Styles.gameButton)} onClick={this.handleClick}>
				{this.props.name}
				{this.props.description}
			</button>
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
	})
};

export default GameButton;