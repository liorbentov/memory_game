import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Card from '../card';
import Styles from './style.css';

class Board extends Component {
	render() {
		const { size: { rows, columns } } = this.props;
		const actualColumns = columns || rows;

		const board = [];
		for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
			let cards = [];
			for (let colIndex = 0; colIndex < actualColumns; colIndex++) {
				cards.push(<Card row={rowIndex} column={colIndex} />);
			}

			board.push(<div className={classNames(Styles.boardRow)}>{cards}</div>);
		}	

		return <div>{board}</div>;
	}
}

Board.propTypes = {
	size: PropTypes.shape({
		rows: PropTypes.number.isRequired,
		columns: PropTypes.number
	}).isRequired,
};

export default Board;