import React from 'react';
import classNames from 'classnames';

import Board from '../board';
import Confetti from '../confetti';
import PlayersList from '../players-list';
import Styles from './style.css';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
      isLoading: false,
      opened: [],
      activePlayer: null,
      results: {},
      dimentions: null,
      instanceId: null,
    };

    this.handlePickCard = this.handlePickCard.bind(this);
    this.handleSwitchPlayer = this.handleSwitchPlayer.bind(this);
    this.setPlayer = this.setPlayer.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.startGame();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  startGame() {
    const { id, location } = this.props;
    const { teamId } = location.state;

    return fetch(`http://localhost:3000/api/games/${id}/start`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ teamId }),
    })
      .then(data => data.json())
      .then(({ x, y, instanceId }) => {
        if (!this._isMounted) {
          return null;
        }
        this.setState({ dimentions: { rows: x, columns: y }, instanceId });
      })
      .catch(() => console.log('Error'));
  }

  setPlayer(activePlayer) {
    this.setState({ activePlayer });
  }

  handleSwitchPlayer() {
    const nextPlayer = this.playersList.switchPlayer();
    this.setState({ activePlayer: nextPlayer });
  }

  isFinished() {
    let currentResults = 0;
    for (let result in this.state.results) {
      currentResults += this.state.results[result];
    }

    const { dimentions } = this.state;
    return currentResults === (dimentions.rows * dimentions.columns) / 2;
  }

  fetchCard(row, column) {
    const { id } = this.props;

    this.setState({ isLoading: true });
    return fetch(`http://localhost:3000/api/games/${id}/item`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        row,
        column,
      }),
    })
      .then(data => data.json())
      .catch(() => {
        this.setState({ isLoading: false });
      });
  }

  handleMatch(selectedCards) {
    const { results, activePlayer, opened } = this.state;
    const activePlayerResults = results[activePlayer];

    let newResults;
    if (activePlayerResults) {
      newResults = Object.assign(results, {
        [activePlayer]: activePlayerResults + 1,
      });
    } else {
      newResults = Object.assign(results, { [activePlayer]: 1 });
    }

    this.setState({
      opened: [...opened, ...selectedCards],
      selected: [],
      results: newResults,
    });
  }

  handlePickCard(row, column) {
    const { selected, opened } = this.state;
    if (selected.length === 1) {
      return this.fetchCard(row, column)
        .then(data => {
          const newSelected = [...selected, { row, column, data }];
          this.setState({ selected: newSelected });

          if (selected[0].data.value === data.value) {
            return this.handleMatch(newSelected);
          }

          return window.setTimeout(() => {
            this.handleSwitchPlayer();
            this.setState({ selected: [] });
          }, 1000);
        })
        .catch(() => console.log('error'));
    }

    this.fetchCard(row, column)
      .then(data => {
        this.setState({ selected: [{ row, column, data }] });
      })
      .catch(() => console.log('error'));
  }

  render() {
    const { dimentions, instanceId } = this.state;
    if (!dimentions || !instanceId) {
      return null;
    }

    return (
      <div>
        <div className={classNames(Styles.gameContainer)}>
          <PlayersList
            instanceId={instanceId}
            results={this.state.results}
            activePlayer={this.state.activePlayer}
            ref={elm => (this.playersList = elm)}
            setPlayer={this.setPlayer}
          />
          <Board
            size={dimentions}
            handlePickCard={this.handlePickCard}
            selectedCards={this.state.selected}
            openedCards={this.state.opened}
          />
        </div>
        {this.isFinished() && <Confetti />}
      </div>
    );
  }
}

export default Game;
