function DeckHandler() {
}

DeckHandler.prototype.deal = function(req, res) {
  res.json({ status: 'ok'});
};

module.exports = DeckHandler;
