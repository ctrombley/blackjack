var Dealer = require('../models/dealer');
var Game = require('../models/game');

function GameHandler() {
}

function createGame(session) {
  var dealerState = session.dealerState,
      dealer,
      game;

  dealer = new Dealer().loadState(dealerState);
  return new Game(dealer);
}

function continueGame(session) {
  var gameState = session.gameState,
      game = createGame(session);

  if (gameState) {
    game = game.loadState(gameState);
  }
  
  return game;
}

GameHandler.prototype.deal = function(req, res) {
  var bet = req.body.bet,
      game,
      result;
  
  game = createGame(req.session);
  game.deal(bet);
  req.session.gameState = game;
  res.json(game.status());
};

GameHandler.prototype.hit = function(req, res) {
  var game,
      result;

  game = continueGame(req.session);
  game.hit();
  req.session.gameState = game;
  res.json(game.status());
};

GameHandler.prototype.stand = function(req, res) {
  var game,
      result;

  game = continueGame(req.session);
  game.stand();
  req.session.gameState = game;
  res.json(game.status());
};

module.exports = GameHandler;
