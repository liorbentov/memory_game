import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Card from '../card';
import Styles from './style.css';

class Board extends Component {
	render() {
		const { size: { rows, columns } } = this.props;
		const actualColumns = columns || rows;

		const openedCards = [...this.props.openedCards, ...this.props.selectedCards]
		const board = [];
		for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
			let cards = [];	

			for (let colIndex = 0; colIndex < actualColumns; colIndex++) {
				const card = openedCards.find(({ row, column }) => {
					return colIndex === column && rowIndex === row;
				});

				const isOpened = !!card;
				const data = card ? card.data : '';

				cards.push(<Card
					data={data} 
					row={rowIndex} 
					column={colIndex} 
					checked={isOpened} 
					onChange={this.props.handlePickCard}
				/>);
			}

			board.push(<div className={classNames(Styles.boardRow)}>{cards}</div>);
		}	

		return <div>{board}</div>;
	}
}

Board.propTypes = {
	handlePickCard: PropTypes.func.isRequired,
	selectedCards: PropTypes.arrayOf(PropTypes.shape({
		row: PropTypes.number.isRequired,
		column: PropTypes.number.isRequired,
	})),
	size: PropTypes.shape({
		rows: PropTypes.number.isRequired,
		columns: PropTypes.number
	}).isRequired,
	openedCards: PropTypes.arrayOf(PropTypes.shape({
		row: PropTypes.number.isRequired,
		column: PropTypes.number.isRequired,
	}))
};

export default Board;