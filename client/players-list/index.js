import React, { Component } from 'react';

import Player from '../player';

class PlayersList extends Component {
	constructor(props) {
		super(props);

		this.state = { players: [], isLoading: false };
	}

	componentDidMount() {
		console.log("did");
		this.fetchPlayers();
	}

	fetchPlayers() {
		const { gameId } = this.props;

		this.setState({ isLoading: true })
		return fetch(`http://localhost:3000/api/games/${gameId}/players`)
			.then(data => data.json())
			.then(data => { 
				return this.setState({ isLoading: false, players: data.players });
			})
			.catch(() => {
				return this.setState({ isLoading: false });
			});
	}

	render() {
		const { isLoading, players } = this.state;

		if (isLoading) {
			return <div>Loading</div>;
		}

		return (
			<div>{ players.map(player => <Player key={player.mail} {...player} />) }	</div>
		);
	}
}

export default PlayersList;