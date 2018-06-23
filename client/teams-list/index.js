import React, { Component } from 'react';
import { Link, Router } from '@reach/router';

import Player from '../player';
import NewTeam from '../new-team';
import Team from '../team';
import GamesList from '../games-list';

const List = ({ teams, navigate }) => {
  return (
    <div>
      <div>
        { teams.map(team => {
          return (
            <button key={team._id} onClick={() => {
              navigate(`/teams/${team._id}`)
            }}>
              <h3>{team.name}</h3>
              <h5>{team._id}</h5>
              <h4>{team.members.length}</h4>
            </button>
          );
        })}
      </div>
      <Link to="/teams/new">Create a new team</Link>
    </div>
  );
};

export default class TeamsList extends Component {
  state = { teams: [], isLoading: false };

  componentDidMount() {
    this.fetchTeams();
  }

  fetchTeams() {
    this.setState({ isLoading: true });
    fetch('http://localhost:3000/api/teams')
      .then(data => data.json())
      .then(teams => {
        this.setState({ teams, isLoading: false });
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { teams, isLoading } = this.state;
    if (isLoading) {
    	return <div>Loading...</div>;
    }

    return (
      <Router>
        <List path="/" teams={teams} />
        <NewTeam path="/new" />
        <Team path=":teamId" />
      </Router>
    );
  }
}
