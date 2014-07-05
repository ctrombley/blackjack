function StatsHandler() {
}

StatsHandler.prototype.stats = function(req, res) {
  res.json(req.session.stats);
};

module.exports = StatsHandler;
