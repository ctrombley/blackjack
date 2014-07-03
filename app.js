var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');

var DeckHandler   = require('./app/handlers/DeckHandler');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

var handlers = {
  deck: new DeckHandler()
};

var router = express.Router();

app.get('/deal', handlers.deck.deal);

app.use('/app', router);

app.use(function(err, req, res, next) {
  console .error(err);
});

module.exports = app;
