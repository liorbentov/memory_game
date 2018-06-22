import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Card from '../card';
import Styles from './style.css';

const findCard = (card, deck) => {
	return deck.find(({ row, column }) => {
		return card.column === column && card.row === row;
	})
};

const isCardInDeck = (card, deck) => {
	return !!findCard(card, deck);
};

class Board extends Component {
	render() {
		const { size: { rows, columns } } = this.props;
		const actualColumns = columns || rows;

		const openedCards = [...this.props.openedCards, ...this.props.selectedCards]
		const board = [];
		for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
			let cards = [];	

			for (let colIndex = 0; colIndex < actualColumns; colIndex++) {
				const card = { row: rowIndex, column: colIndex };
				const isSelected = isCardInDeck(card, this.props.selectedCards);
				const openedCard = findCard(card, openedCards)
				const data = !!openedCard ? openedCard.data : '';

				cards.push(<Card
					key={`${rowIndex}${colIndex}`}
					data={data} 
					row={rowIndex} 
					column={colIndex} 
					checked={!!openedCard} 
					onChange={this.props.handlePickCard}
					isSelected={isSelected}
				/>);
			}

			board.push(<div key={rowIndex} className={classNames(Styles.boardRow)}>{cards}</div>);
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