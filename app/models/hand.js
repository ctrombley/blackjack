function Hand(dealer) {
  this.dealer = dealer;
  this.playerCards = [];
  this.dealerCards = [];
  this.outcome = '';
}

function cardTotal() {
  var total,
      aces;
      
  total = this.map(function(pc) {
    return pc.value();
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

Hand.prototype.deal = function() {
  var newPlayerCards = this.dealer.deal(2),
      newDealerCards = this.dealer.deal(2);

  this.playerCards = this.playerCards.concat(newPlayerCards);
  this.dealerCards = this.dealerCards.concat(newDealerCards);
};

Hand.prototype.hit = function() {
  var newPlayerCards = this.dealer.deal(1),
      playerTotal,
      aces;

  this.playerCards = this.playerCards.concat(newPlayerCards);
  playerTotal = cardTotal.apply(this.playerCards);

  if (playerTotal > 21) {
    this.outcome = 'bust';
  } else if (playerTotal === 21) {
    this.outcome = 'blackjack';
  }
};

Hand.prototype.stand = function() {
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
  } else if (playerTotal === dealerTotal) {
    this.outcome = 'push';
  } else if (playerTotal < dealerTotal) {
    this.outcome = 'loss';
  }
};

module.exports = Hand;
