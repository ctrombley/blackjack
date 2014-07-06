function Stats() {
  this.credits = 1000;
  this.gamesPlayed = 0;
  this.gamesWon = 0;
  this.gamesLost = 0;
  this.gamesPushed = 0;
}

Stats.prototype.loadState = function(state) {
  if (state === null) {
    return this;
  }

  this.credits = state.credits;
  this.gamesPlayed = state.gamesPlayed;
  this.gamesWon = state.gamesWon;
  this.gamesPushed = state.gamesPushed;

  return this;
};

Stats.prototype.bet = function(bet) {
  this.credits -= bet;
};

Stats.prototype.win = function(bet) {
  this.credits += bet * 2;
  this.gamesWon += 1;
  this.gamesPlayed += 1;
};

Stats.prototype.loss = function() {
  this.gamesLost += 1;
  this.gamesPlayed += 1;
};

Stats.prototype.push = function(bet) {
  this.credits += bet;
  this.gamesLost += 1;
  this.gamesPlayed += 1;
};

module.exports = Stats;
