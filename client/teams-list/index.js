import React from 'react';
import { Link, Router } from '@reach/router';

import Player from '../player';
import NewTeam from '../new-team'

const List = () => {
  return (
    <div>
      <div>List</div>
      <Link to="/teams/new">Create a new team</Link>
    </div>
  );
};

const Team = ({ id }) => {
  return <div>{id}</div>;
};

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
      });
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
