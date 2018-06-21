import React from 'react';
import { Router } from "@reach/router"

import GameButton from '../game-button';
import Board from '../board';

class Game extends React.Component {
	constructor(props) {
		super(props);

		this.state = { selected: []};
		this.handlePickCard = this.handlePickCard.bind(this);
	}

	handlePickCard(row, column) {
		const { selected } = this.state;
		if (selected.length === 1) {
			this.setState({ selected: [...selected, { row, column }] })
			return window.setTimeout(() => {
				this.setState({ selected: []})
			}, 2000);
		}

		this.setState({ selected: [...selected, { row, column }]});
	}

	render() {
		return (
			<div>
				{ `Game: ${this.props.id}` }
				<Board 
					size={{ rows: 4, columns: 5 }} 
					handlePickCard={this.handlePickCard} 
					selectedCards={this.state.selected}
					openedCards={[]}
				/>
			</div>
		);
	}
};

const List = ({ games }) => {
	return games.map(game => <GameButton key={game._id} id={game._id} {...game} />);
};

export default class GamesList extends React.Component {
	constructor(props) {
		super(props);
		this.state = { games: [], isLoading: false };
	}

	componentDidMount() {
		this.fetchGames();
	}

	fetchGames() {
		this.setState({ isLoading: true });
		fetch('http://localhost:3000/api/games')
			.then(data => data.json())
			.then(games => {
				this.setState({ games, isLoading: false });
			})
			.catch(() => {
				this.setState({ isLoading: false });
			})
	}

	render() {
		const { games, isLoading } = this.state;
		if (isLoading) {
			return <div>Loading...</div>;
		}

		return (
			<Router>
				<List path="/" games={games} />
				<Game path=":id" />
			</Router>
		); 	
	}
}