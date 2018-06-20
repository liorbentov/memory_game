import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Router } from "@reach/router"

import GamesList from './games-list';
import Home from './home';

const Game = props => {
	return `Game: ${props.id}`;
}

const GamesIndex = () => {
	return "Index";
}

class App extends React.Component {
	render() {
		return (
			<div>
			<h1>
				bla
			</h1>
				<nav>
				  <Link to="/">Home</Link>{" "}
				  <Link to="games">Games</Link>
			</nav>
			<Router>
			  <Home path="/" />
			  <GamesList path="games">
			  	<GamesIndex path="/" />
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