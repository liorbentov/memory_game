const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Game = new Schema({
  id: ObjectId,
  name: String,
  description: String,
  size: {
    rows: Number,
    columns: Number,
  },
});

const Item = new Schema({
  type: String,
  value: String,
});

const GameItemsSchema = new Schema({
  id: ObjectId,
  gameId: String,
  items: [Item],
});

const Player = new Schema({
  name: String,
  mail: String,
});

const GamePlayersSchema = new Schema({
  id: ObjectId,
  gameId: String,
  players: [Player],
});

const TeamSchema = new Schema({
  id: ObjectId,
  name: String,
  members: [Player],
})

const connectionString = `mongodb://localhost:${DB_PORT}/${DB_NAME}`;

const conn = mongoose.createConnection(connectionString);
const MyModel = conn.model('games', Game);
const GameItems = conn.model('GameItem', GameItemsSchema, 'gameItems');
const GamePlayers = conn.model('GameItem', GamePlayersSchema, 'gamePlayers');
const Team = conn.model('Team', TeamSchema);

const getGames = () => {
  return MyModel.find();
};

const getGameItems = id => {
  return GameItems.findOne({ gameId: id });
};

const getGamePlayers = id => {
  return GamePlayers.findOne({ gameId: id });
};

const createTeam = team => {
  return Team.create(team);
}

module.exports = {
  createTeam,
  getGames,
  getGameItems,
  getGamePlayers,
};
