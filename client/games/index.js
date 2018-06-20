import React from 'react';

import GameButton from '../game-button';

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
		fetch('http://localhost:3000/games')
			.then(data => data.json())
			.then(games => {
				this.setState({ games, isLoading: false });
			})
			.catch(() => {
				console.log("Error!");
				this.setState({ isLoading: false });
			})
	}

	render() {
		const { games, isLoading } = this.state;
		if (isLoading) {
			return <div>Loading...</div>;
		}

		return (
			<div>{games.map(game => <GameButton id={game._id} {...game} />)}</div>
		); 
	}
}