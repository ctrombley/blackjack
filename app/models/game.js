var Card = require('./card');

function Game(dealer, stats) {
  this.playerCards = [];
  this.dealerCards = [];
  this.outcome = '';
  this.hideDealerCard = true;
  this.bet = 0;

  this.dealer = dealer;
  this.stats = stats;
}

function cardTotal() {
  var total,
      aces;

  if (this.length === 0) {
    return 0;
  }

  total = this.map(function(pc) {
    return pc.value;
  }).reduce(function(pv, cv) {
    return pv + cv;
  });

  aces = aceCount.apply(this);
  return adjustForAces(total, aces);
}

function aceCount() {
  return this.filter(function(pc) {
    return pc.rank === 'A';
  }).length;
}

function adjustForAces(total, aces) {
  while (total > 21 && aces > 0) {
    if (total > 21) {
      total = total - 10;
      aces = aces - 1;
    }
  }

  return total;
}

Game.prototype.loadState = function(state) {
  if (!state) {
    return this;
  }

  this.playerCards = state.playerCards;
  this.dealerCards = state.dealerCards;
  this.outcome = state.outcome;
  this.hideDealerCard = state.hideDealerCard;
  this.bet = state.bet;

  return this;
};

Game.prototype.deal = function(bet) {
  var playerTotal;

  this.bet = bet;
  this.stats.credits -= this.bet;

  var newPlayerCards = this.dealer.deal(2),
  newDealerCards = this.dealer.deal(2);

  this.playerCards = this.playerCards.concat(newPlayerCards);
  this.dealerCards = this.dealerCards.concat(newDealerCards);

  playerTotal = cardTotal.apply(this.playerCards);

  if (playerTotal === 21) {
    this.outcome = 'blackjack';
    this.stats.win(this.bet);
  }
};

Game.prototype.hit = function() {
  var newPlayerCards = this.dealer.deal(1),
  playerTotal,
  aces;

  this.playerCards = this.playerCards.concat(newPlayerCards);
  playerTotal = cardTotal.apply(this.playerCards);

  if (playerTotal > 21) {
    this.outcome = 'bust';
    this.stats.loss();
  } else if (playerTotal === 21) {
    this.outcome = 'blackjack';
    this.stats.win(this.bet);
  }
};

Game.prototype.stand = function() {
  var newDealerCard,
  dealerTotal,
  playerTotal;

  while (cardTotal.apply(this.dealerCards) < 17) {
    newDealerCard = this.dealer.deal(1);
    this.dealerCards = this.dealerCards.concat(newDealerCard);
  }

  dealerTotal = cardTotal.apply(this.dealerCards);
  playerTotal = cardTotal.apply(this.playerCards);

  if (dealerTotal > 21 || playerTotal > dealerTotal) {
    this.outcome = 'win';
    this.stats.win(this.bet);
  } else if (playerTotal === dealerTotal) {
    this.outcome = 'push';
    this.stats.push(this.bet);
  } else if (playerTotal < dealerTotal) {
    this.outcome = 'loss';
    this.stats.loss();
  }

  this.hideDealerCard = false;
};

Game.prototype.status = function() {
  return {
    playerCards: this.playerCards,
    dealerCards: this.hideDealerCard ? this.dealerCards.slice(0, 1) : this.dealerCards,
    hideDealerCard: this.hideDealerCard,
    outcome: this.outcome,
  };
};

module.exports = Game;
