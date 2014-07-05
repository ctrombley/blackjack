var express       = require('express'),
    app           = express(),
    bodyParser    = require('body-parser'),
    session       = require('express-session'),
    errorhandler  = require('errorhandler'),
    GameHandler   = require('./app/handlers/gameHandler'),
    Dealer        = require('./app/models/dealer');

var handlers = {
  game: new GameHandler()
};

app.use(bodyParser.json());
app.use(session({ secret: 'blackjack',
                  saveUninitialized: true,
                  resave: true }));

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  req.session.dealerState = req.session.dealerState || new Dealer();
  next();
});

app.post('/deal',   handlers.game.deal);
app.post('/hit',    handlers.game.hit);
app.post('/stand',  handlers.game.stand);

if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler());
}

module.exports = app;
