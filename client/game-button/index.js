import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GameButton extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		console.log(this.props.id);
	}

	render() {
		return <button onClick={this.handleClick}>{this.props.name}</button>;
	}
}

GameButton.propType = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};

export default GameButton;