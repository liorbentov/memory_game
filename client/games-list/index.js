import React from 'react';
import { Router } from "@reach/router"

import GameButton from '../game-button';

const Game = props => {
	return `Game: ${props.id}`;
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