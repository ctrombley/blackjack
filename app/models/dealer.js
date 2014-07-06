var Card = require('./card');

function Dealer(decksInStack) {
  this.ranks = ['A', '2', '3', '4', '5', '6', '7',
                '8', '9', '10', 'J', 'Q', 'K'];
  this.suits = ['club', 'diamond', 'heart', 'spade'];
  this.deckSize = this.ranks.length * this.suits.length;
  this.decksInStack = decksInStack || 1;

  this.cards = [];
  
  makeStack.apply(this);
  this.shuffle();
}

function makeStack() {
  var i, j, k;

  for (i=0; i<this.decksInStack; i++) {
    for (j=0; j<this.suits.length; j++) {
      for (k=0; k<this.ranks.length; k++){
        var index = i * this.deckSize + j * this.ranks.length + k;
        this.cards[index] = new Card(this.ranks[k], this.suits[j]);
      }
    }
  }
}

Dealer.prototype.loadState = function(state) {
  if (!state) {
    return this;
  }

  this.decksInStack = state.decksInStack;
  this.cards = state.cards;

  return this;
};

Dealer.prototype.shuffle = function(times) {
  var i, j, k,
      temp;

  times = times || 1;

  for (i=0; i<times; i++) {
    for (j=0; j < this.cards.length; j++) {
      k = Math.floor(Math.random() * this.cards.length);
      temp = this.cards[j];
      this.cards[j] = this.cards[k];
      this.cards[k] = temp;
    }
  }

  return this;
};

Dealer.prototype.deal = function(cards) {
  var dealt = [],
      i;

  for (i=0; i<cards; i++) {
    dealt.push(this.cards.pop());
    if (this.cards.length === 0) {
      makeStack.apply(this);
      this.shuffle();
    }
  }

  return dealt;
};

module.exports = Dealer;
