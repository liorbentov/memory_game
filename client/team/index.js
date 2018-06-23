import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Player from '../player';
import GamesList from '../games-list';
import Styles from './style.css';

export default class MembersList extends Component {
  static propTypes = {
    teamId: PropTypes.string,
  };

  state = { members: [], isLoading: false };

  componentDidMount() {
    this._isMounted = true;
    this.fetchMembers();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchMembers() {
    const { teamId } = this.props;

    this.setState({ isLoading: true });
    return fetch(`http://localhost:3000/api/teams/${teamId}/members`)
      .then(data => data.json())
      .then(data => {
        if (!this._isMounted) {
          return null;
        }
        return this.setState({ isLoading: false, members: data });
      })
      .catch(() => {
        if (!this._isMounted) {
          return null;
        }
        return this.setState({ isLoading: false });
      });
  }

  render() {
    const { isLoading, members } = this.state;

    if (isLoading) {
      return <div>Loading</div>;
    }

    return (
      <div className={classNames(Styles.teamContainer)}>
        <div>
          <h3>Team members</h3>
          {members.map(player => <Player key={player.mail} {...player} />)}
        </div>
        <div>
          <h3>Pick a game</h3>
          {members.length && <GamesList teamId={this.props.teamId} />}
        </div>
      </div>
    );
  }
}
