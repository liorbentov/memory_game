import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Router } from "@reach/router"

import GamesList from './games-list';
import Home from './home';

const Game = props => {
	return props.children;
};

class App extends React.Component {
	render() {
		return (
			<div>
			<h1>
				Memory Game
			</h1>
				<nav>
				  <Link to="/">Home</Link>{" "}
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