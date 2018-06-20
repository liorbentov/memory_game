const express = require('express');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const app = express();
const bodyParser = require('body-parser');

const db = require('./db.js');

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

app.get('/games/:id/start', function(req, res) {
    const { id } = req.params;
    res.send(`start game (${id})`);
});

app.get('/games', (req, res) => {
  db.getGames().then(values => res.send(values));
});

app.post('/games', (req, res) => {
    console.log(req.body.id);
    res.send('ok');
});

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
