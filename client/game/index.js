import React from 'react';

import Board from '../board';

class Game extends React.Component {
	constructor(props) {
		super(props);

		this.state = { selected: [], isLoading: false, opened: [] };
		this.handlePickCard = this.handlePickCard.bind(this);
	}

	fetchCard(row, column) {
		const { id } = this.props;

		this.setState({ isLoading: true })
		return fetch(`http://localhost:3000/api/games/${id}/item`, {
			method: 'post',
			headers: {
				'content-type': 'application/json',	
			},
			body: JSON.stringify({
				row, column
			})
		})
			.then(data => data.json())
			.catch(() => {
				this.setState({ isLoading: false });
			});
	}

	handlePickCard(row, column) {
		const { selected, opened } = this.state;
		if (selected.length === 1) {
			return this.fetchCard(row, column)
				.then(data => {
					const newSelected = [...selected,{ row, column, data }];
					this.setState({ selected: newSelected });

					if (selected[0].data === data) {
						this.setState({ opened: [...opened, ...newSelected], selected: [] })
						return console.log("Match!");
					}

					return window.setTimeout(() => {
						this.setState({ selected: []})
					}, 1000);
				})
				.catch(() => console.log("error"));
		}

		this.fetchCard(row, column)
			.then(data => {
				this.setState({ selected: [{ row, column, data }]});
			})
			.catch(() => console.log("error"));
	}

	render() {
		return (
			<div>
				{ `Game: ${this.props.id}` }
				<Board 
					size={{ rows: 4, columns: 5 }} 
					handlePickCard={this.handlePickCard} 
					selectedCards={this.state.selected}
					openedCards={this.state.opened}
				/>
			</div>
		);
	}
};

export default Game;