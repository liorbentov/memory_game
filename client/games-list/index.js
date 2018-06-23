import React, { Component } from 'react';
import { Router } from '@reach/router';

import Game from '../game';
import GameButton from '../game-button';

const List = ({ games }) => {
  return games.map(game => (
    <GameButton key={game._id} id={game._id} {...game} />
  ));
};

export default class GamesList extends Component {
  state = { games: [], isLoading: false };

  componentDidMount() {
    this._isMounted = true;
    this.fetchGames();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchGames() {
    this.setState({ isLoading: true });
    fetch('http://localhost:3000/api/games')
      .then(data => data.json())
      .then(games => {
        if (!this._isMounted) {
          return null;
        }

        this.setState({ games, isLoading: false });
      })
      .catch(() => {
        if (!this._isMounted) {
          return null;
        }
        
        this.setState({ isLoading: false });
      });
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
