import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Match, Router } from '@reach/router';

import Game from '../game';
import GameButton from '../game-button';

const List = ({ games, teamId }) => {
  return games.map(game => (
    <GameButton key={game._id} id={game._id} teamId={teamId} {...game} />
  ));
};

export default class GamesList extends Component {
  static propTypes = {
    teamId: PropTypes.string,
  };

  state = { games: [], isLoading: true };

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
      <Match path="/games/:id">
        {props =>
          props.match ? (
            <Game {...props.match} {...props} />
          ) : (
            <List
              games={games}
              teamId={this.props.teamId}
              {...props.match}
              {...props}
            />
          )
        }
      </Match>
    );
  }
}
