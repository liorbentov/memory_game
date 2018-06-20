import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Router } from "@reach/router"

import GamesList from './games';
import Home from './home';

class App extends React.Component {
	render() {
		return (
			<div>
			<h1>
				bla
				<nav>
				  <Link to="/">Home</Link>{" "}
				  <Link to="list">Dashboard</Link>
				</nav>
			</h1>
			<Router>
			  <Home path="/" />
			  <GamesList path="/list" />
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