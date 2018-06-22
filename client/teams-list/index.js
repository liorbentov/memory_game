import React from 'react';
import { Link, Router } from "@reach/router"

import Player from '../player';

// const List = ({ games }) => {
// 	return games.map(game => <GameButton key={game._id} id={game._id} {...game} />);
// };

const List = () => {
	return (
		<div>
			<div>List</div>
			<Link to="/teams/new">Create a new team</Link>
		</div>
	);
}

class NewTeam extends React.Component {
	constructor(props) {
		super(props);

		this.state = { rows: [{}] }

		this.createTeam = this.createTeam.bind(this);
		this.handleChangeAttribute = this.handleChangeAttribute.bind(this);
	}

	handleChangeAttribute(rowIndex, attribute, newValue) {
	    const { rows } = this.state;
	    const last = rows[rowIndex];
	    
	    if (Object.keys(last).length === 0) {
	    	const row = { [attribute]: newValue };
	      	return this.setState({ rows: [...rows.slice(0, rowIndex), row, {}] });
	    }

	    const row = { ...rows[rowIndex], [attribute]: newValue };

	    this.setState({
	      rows: [...rows.slice(0, rowIndex), row, ...rows.slice(rowIndex + 1)]
	    });
	}

	createTeam() {
		const { rows } = this.state;
		const filteredRows = rows.filter(row => Object.keys(row).length > 0);

		console.log(rows, filteredRows);
	}

	render() {
		return (
			<div>
				{ this.state.rows.map((player, index) => {
					return <Player 
					key={index} 
					rowIndex={index} 
					isEditable={true}
					handleEdit={this.handleChangeAttribute}
					{...player} />;
				}) }
				<button onClick={this.createTeam}>Create</button>
			</div>
		);	
	}
	
}

const Team = ({ id }) => {
	return <div>{id}</div>;
}

export default class GamesList extends React.Component {
	constructor(props) {
		super(props);
		this.state = { games: [], isLoading: false };
	}

	componentDidMount() {
		// this.fetchGames();
	}

	fetchGames() {
		this.setState({ isLoading: true });
		fetch('http://localhost:3000/api/teams')
			.then(data => data.json())
			.then(games => {
				this.setState({ games, isLoading: false });
			})
			.catch(() => {
				this.setState({ isLoading: false });
			})
	}

	render() {
		// const { games, isLoading } = this.state;
		// if (isLoading) {
		// 	return <div>Loading...</div>;
		// }

		return (
			<Router>
				<List path="/" />
				<NewTeam path="/new" />
				<Team path=":id" />
			</Router>
		); 	
	}
}