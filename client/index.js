import React from 'react';
import ReactDOM from 'react-dom';

import GameButton from './game-button';

class App extends React.Component {
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
				console.log(games);
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
			<div>{games.map(({ _id, name }) => <GameButton id={_id} name={name} />)}</div>
		);
	}
}
 
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <App />,
    document.getElementById('mount')
  );
});