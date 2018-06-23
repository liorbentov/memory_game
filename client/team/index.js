import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Player from '../player';
import GamesList from '../games-list';
import Styles from './style.css';

class MembersList extends Component {
  constructor(props) {
    super(props);

    this.state = { members: [], isLoading: false };
  }

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
          {members.map(player => {
            const { mail } = player;
            
            return (
              <Player
                key={mail}
                {...player}
              />
            );
          })}
        </div>
        <div>
          <h3>Pick a game</h3>
          <GamesList />
        </div>
      </div>
    );
  }
}

MembersList.propTypes = {
  teamId: PropTypes.string,
};

export default MembersList;
