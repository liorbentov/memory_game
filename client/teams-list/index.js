import React from 'react';
import { Link, Router } from "@reach/router"

import Player from '../player';

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

		this.state = { rows: [{ isEmpty: true }], teamName: '' }

		this.createTeam = this.createTeam.bind(this);
		this.handleChangeAttribute = this.handleChangeAttribute.bind(this);
		this.handleChangeTeamName = this.handleChangeTeamName.bind(this);
		this.handleRemovePlayer = this.handleRemovePlayer.bind(this);
	}

	handleChangeAttribute(rowIndex, attribute, newValue) {
	    const { rows } = this.state;
	    const current = rows[rowIndex];
	    
	    if (current.isEmpty) {
	    	const row = { ...current, [attribute]: newValue, isEmpty: false };
	      	return this.setState({ rows: [...rows.slice(0, rowIndex), row, { isEmpty: true }] });
	    }

	    const row = { ...rows[rowIndex], [attribute]: newValue };

	    this.setState({
	      rows: [...rows.slice(0, rowIndex), row, ...rows.slice(rowIndex + 1)]
	    });
	}

	handleRemovePlayer(rowIndex) {
		const { rows } = this.state;

		if (rows.length === 1) {
			return this.setState({ rows: [{ isEmpty: true }] });
		}

	    this.setState({
	      rows: [...rows.slice(0, rowIndex), ...rows.slice(rowIndex + 1)]
	    });
	}

	handleChangeTeamName(e) {
		this.setState({ teamName: e.target.value });
	}

	createTeam() {
		const { rows } = this.state;
		const filteredRows = rows.filter(row => !row.isEmpty);
		const mappedRows = filteredRows.map(({ name, mail }) => ({ name ,mail }));

		console.log(rows, mappedRows);
	}

	render() {
		return (
			<div>
				<input 
					type="text" 
					placeholder="Team name" 
					value={this.state.teamName}
					onChange={this.handleChangeTeamName}
				/>
				{ this.state.rows.map((player, index) => {
					return <Player 
					key={index} 
					rowIndex={index} 
					isEditable={true}
					handleEdit={this.handleChangeAttribute}
					handleRemove={this.handleRemovePlayer}
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