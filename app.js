var express       = require('express'),
    app           = express(),
    bodyParser    = require('body-parser'),
    session       = require('express-session'),
    errorhandler  = require('errorhandler'),
    GameHandler   = require('./app/handlers/gameHandler'),
    StatsHandler  = require('./app/handlers/statsHandler'),
    Dealer        = require('./app/models/dealer'),
    Stats         = require('./app/models/stats');

var handlers = {
  game:  new GameHandler(),
  stats: new StatsHandler()
};

app.use(bodyParser.urlencoded());
app.use(session({ secret: 'blackjack',
                  saveUninitialized: true,
                  resave: true }));

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  req.session.dealerState = req.session.dealerState || new Dealer();
  req.session.stats = req.session.stats || new Stats();
  next();
});

app.post('/deal',   handlers.game.deal);
app.post('/hit',    handlers.game.hit);
app.post('/stand',  handlers.game.stand);
app.get('/stats',   handlers.stats.stats);

if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler());
}

module.exports = app;
