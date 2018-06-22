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

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

let matrix;

app.get('/api/games/:id/start', function(req, res) {
    const { id } = req.params;
    db.getGameItems(id).then(values => {
      const { items } = values;
      matrix = logic.buildMatrix(items.length);
      res.send(logic.getBoardDimentions(items.length));
    });
});

app.get('/api/games', (req, res) => {
  db.getGames().then(values => res.send(values));
});

app.get('/api/games/:id/players', (req, res) => {
  const { id } = req.params;
  db.getGamePlayers(id).then(values => res.send(values));
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

app.post('/api/games', (req, res) => {
    console.log(req.body.id);
    res.send('ok');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
