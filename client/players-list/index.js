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
    const { instanceId } = this.props;

    this.setState({ isLoading: true });
    return fetch(`http://localhost:3000/api/instances/${instanceId}/players`)
      .then(data => data.json())
      .then(data => {
        if (!this._isMounted) {
          return null;
        }
        this.props.setPlayer(data.players[0].mail);
        return this.setState({ isLoading: false, players: data.players });
      })
      .catch(() => {
        if (!this._isMounted) {
          return null;
        }
        return this.setState({ isLoading: false });
      });
  }

  switchPlayer = () => {
    const { players } = this.state;
    const { activePlayer } = this.props;
    if (!activePlayer) {
      return players[0].mail;
    }

    const index = players.findIndex(player => player.mail === activePlayer);
    const nextPlayerIndex = (index + 1) % players.length;
    return players[nextPlayerIndex].mail;
  };

  render() {
    const { isLoading, players } = this.state;

    if (isLoading) {
      return <div>Loading</div>;
    }

    return (
      <div>
        {players.map(player => {
          const { mail } = player;
          const isActive = mail === this.props.activePlayer;
          const results = this.props.results[mail] || 0;
          return (
            <Player
              key={mail}
              isActive={isActive}
              results={results}
              {...player}
            />
          );
        })}
      </div>
    );
  }
}

PlayersList.propTypes = {
  activePlayer: PropTypes.string,
  instanceId: PropTypes.string.isRequired,
  results: PropTypes.object,
};

export default PlayersList;
