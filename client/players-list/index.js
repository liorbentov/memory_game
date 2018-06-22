import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Player from '../player';

class PlayersList extends Component {
	constructor(props) {
		super(props);

		this.state = { players: [], isLoading: false };
	}

	componentDidMount() {
		this._isMounted = true;
		this.fetchPlayers();
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	fetchPlayers() {
		const { gameId } = this.props;

		this.setState({ isLoading: true })
		return fetch(`http://localhost:3000/api/games/${gameId}/players`)
			.then(data => data.json())
			.then(data => { 
				if (!this._isMounted) {
					return null;
				}
				return this.setState({ isLoading: false, players: data.players });
			})
			.catch(() => {
				if (!this._isMounted) {
					return null;
				}
				return this.setState({ isLoading: false });
			});
	}

	render() {
		const { isLoading, players } = this.state;

		if (isLoading) {
			return <div>Loading</div>;
		}

		return (
			<div>{ players.map(player => <Player key={player.mail} {...player} />) }</div>
		);
	}
}

PlayersList.propTypes = {
	gameId: PropTypes.string.isRequired,
};

export default PlayersList;