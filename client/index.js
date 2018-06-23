import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Link, Router } from '@reach/router';

import GamesList from './games-list';
import TeamsList from './teams-list';
import Home from './home';
import Styles from './style.css';

const Wrapper = props => {
  console.log(props);
};

class App extends React.Component {
  render() {
    return (
      <div>
        <nav className={classNames(Styles.navbar)}>
          <Link className={classNames(Styles.logo)} to="/">
            MemoryGame
          </Link>{' '}
          <Link to="games">Games</Link>
          <Link to="teams">Teams</Link>
        </nav>
        <Router>
          <Home path="/" />
          <GamesList path="games">
            <Wrapper path="/" />
          </GamesList>
          <TeamsList path="teams">
            <Wrapper path=":id" />
          </TeamsList>
        </Router>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<App />, document.getElementById('mount'));
});
