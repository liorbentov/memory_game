import React from 'react';
import classNames from 'classnames';

import Board from '../board';
import Confetti from '../confetti';
import PlayersList from '../players-list';	
import Styles from './style.css';

class Game extends React.Component {
	constructor(props) {
		super(props);

		this.state = { 
			selected: [], 
			isLoading: false, 
			opened: [], 
			activePlayer: null,
			results: {}
		};
		
		this.handlePickCard = this.handlePickCard.bind(this);
		this.handleSwitchPlayer = this.handleSwitchPlayer.bind(this);
		this.setPlayer = this.setPlayer.bind(this);
	}

	setPlayer(activePlayer) {
		this.setState({ activePlayer });
	}

	handleSwitchPlayer() {
		const nextPlayer = this.playersList.switchPlayer();
		this.setState({ activePlayer: nextPlayer });
	}

	isFinished() {
		console.log(this.state.results);
		let currentResults = 0;
		for (let result in this.state.results) {
			currentResults += this.state.results[result];
		}

		return currentResults === 10;
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

	handleMatch(selectedCards) {
		const { results, activePlayer, opened } = this.state;
		const activePlayerResults = results[activePlayer];

		let newResults;
		if (activePlayerResults) {
			newResults = Object.assign(results, { [activePlayer]: activePlayerResults + 1 });
		} else {
			newResults = Object.assign(results, { [activePlayer]: 1 });
		}

		this.setState({ 
			opened: [...opened, ...selectedCards], 
			selected: [], 
			results: newResults 
		});
	}

	handlePickCard(row, column) {
		const { selected, opened } = this.state;
		if (selected.length === 1) {
			return this.fetchCard(row, column)
				.then(data => {
					const newSelected = [...selected,{ row, column, data }];
					this.setState({ selected: newSelected });

					if (selected[0].data.value === data.value) {
						return this.handleMatch(newSelected);
					}

					return window.setTimeout(() => {
						this.handleSwitchPlayer();
						this.setState({ selected: []});
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
				<div className={classNames(Styles.gameContainer)}>
					<PlayersList 
						gameId={this.props.id} 
						results={this.state.results} 
						activePlayer={this.state.activePlayer}
						ref={ elm => this.playersList = elm }
						setPlayer={this.setPlayer}
					/>
					<Board 
						size={{ rows: 4, columns: 5 }} 
						handlePickCard={this.handlePickCard} 
						selectedCards={this.state.selected}
						openedCards={this.state.opened}
					/>
					
				</div>
				{ this.isFinished() && <Confetti />}
			</div>
		);
	}
};

export default Game;