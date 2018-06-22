import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Link, Router } from "@reach/router"

import GamesList from './games-list';
import Home from './home';
import Styles from './style.css';

const Game = props => {
	return props.children;
};

class App extends React.Component {
	render() {
		return (
			<div>
				<nav className={classNames(Styles.navbar)}>
				  <Link className={classNames(Styles.logo)} to="/">MemoryGame</Link>{" "}
				  <Link to="games">Games</Link>
				</nav>
				<Router>
				  <Home path="/" />
				  <GamesList path="games">
				  	<Game path=":id" />
				  </GamesList>
				</Router>
			</div>
		)

	}
}
 
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <App />,
    document.getElementById('mount')
  );
});