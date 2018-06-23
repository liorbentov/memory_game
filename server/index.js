const express = require('express');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const app = express();
const bodyParser = require('body-parser');

const db = require('./db.js');
const logic = require('./logic.js');

const compiler = webpack(webpackConfig);

app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(
  webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    stats: {
      colors: true,
    },
    historyApiFallback: true,
  })
);

let matrix;

app.post('/api/games/:gameId/start', function(req, res) {
  const { gameId } = req.params;
  const { teamId } = req.body;

  let instanceId;
  db.getTeam(teamId)
    .then(team => team.members)
    .then(members => db.createGameInstance(gameId, members))
    .then(response => {
      instanceId = response._id;
      return db.getGameItems(gameId);
    })
    .then(response => {
      const { items } = response;
      matrix = logic.buildMatrix(items.length);
      res.send({ ...logic.getBoardDimentions(items.length), instanceId });
    });
});

app.get('/api/games', (req, res) => {
  db.getGames().then(values => res.send(values));
});

app.get('/api/instances/:id/players', (req, res) => {
  const { id } = req.params;
  db.getGameInstances(id).then(values => res.send(values));
});

app.get('/api/games/:id/items', (req, res) => {
  const { id } = req.params;
  db.getGameItems(id).then(values => res.send(values));
});

app.post('/api/games/:id/item', (req, res) => {
  const { row, column } = req.body;
  const itemIndex = matrix[row][column];

  const { id } = req.params;
  db.getGameItems(id).then(values => {
    const item = values.items[itemIndex];
    res.send(item);
  });
});

app.get('/api/teams', (req, res) => {
  db.getTeams().then(teams => res.send(teams));
});

app.post('/api/teams', (req, res) => {
  const { name, members } = req.body;
  db.createTeam({ name, members }).then(result => res.send(result));
});

app.get('/api/teams/:id/members', (req, res) => {
  const { id } = req.params;
  db.getTeam(id).then(team => res.send(team.members));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
