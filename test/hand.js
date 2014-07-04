var should  = require('should');
var sinon   = require('sinon');
var cards   = require('./mockCards');
var Card    = require('../app/models/card');
var Dealer  = require('../app/models/dealer');
var Hand    = require('../app/models/hand');

var dealer,
    hand;

beforeEach(function() {
  dealer = new Dealer();
  dealer.deal = sinon.stub();
  nextCards(1, [cards.tenOfSpades]);
  nextCards(2, [cards.tenOfSpades, cards.tenOfSpades]);
  hand = new Hand(dealer);
});

function nextCards(count, cards) {
  dealer.deal.withArgs(count).returns(cards);
}

function nextCard(card) {
  dealer.deal.withArgs(1).returns([card]);
}

describe('Hand', function() {

  describe('at start of hand', function() {
    it('should deal two player cards and two dealer cards', function() {
      hand.deal();
      hand.playerCards.should.have.length(2);
      hand.dealerCards.should.have.length(2);
    });
  });

  describe('when player hits', function() {
    it('should deal one player card', function() {
      hand.hit();
      hand.playerCards.should.have.length(1);
      hand.hit();
      hand.playerCards.should.have.length(2);
    });

    it('should bust the player if over 21', function() {
      nextCard(cards.tenOfSpades);
      hand.hit();
      nextCard(cards.tenOfClubs);
      hand.hit();
      nextCard(cards.twoOfHearts);
      hand.hit();
      hand.outcome.should.eql('bust');
    });

    it('should award blackjack to the player if at 21', function() {
      nextCard(cards.sixOfSpades);
      hand.hit();
      nextCard(cards.fiveOfClubs);
      hand.hit();
      nextCard(cards.tenOfClubs);
      hand.hit();
      hand.outcome.should.eql('blackjack');
    });

    it('should award blackjack to the player if at 21 with an ace', function() {
      nextCard(cards.tenOfSpades);
      hand.hit();
      nextCard(cards.tenOfClubs);
      hand.hit();
      nextCard(cards.aceOfClubs);
      hand.hit();
      hand.outcome.should.eql('blackjack');
    });

    it('should bust the player if over 21 with multiple aces', function() {
      nextCard(cards.aceOfClubs);
      hand.hit();
      nextCard(cards.aceOfHearts);
      hand.hit();
      nextCard(cards.aceOfDiamonds);
      hand.hit();
      nextCard(cards.tenOfClubs);
      hand.hit();
      nextCard(cards.nineOfDiamonds);
      hand.hit();
      hand.outcome.should.eql('bust');
    });

    it('should award blackjack to the player if at 21 with multiple aces', function() {
      nextCard(cards.aceOfClubs);
      hand.hit();
      nextCard(cards.aceOfHearts);
      hand.hit();
      nextCard(cards.aceOfDiamonds);
      hand.hit();
      nextCard(cards.tenOfClubs);
      hand.hit();
      nextCard(cards.eightOfDiamonds);
      hand.hit();
      hand.outcome.should.eql('blackjack');
    });

    it('should award blackjack to the player if at 21 with multiple aces', function() {
      nextCard(cards.aceOfClubs);
      hand.hit();
      nextCard(cards.aceOfHearts);
      hand.hit();
      nextCard(cards.aceOfDiamonds);
      hand.hit();
      nextCard(cards.tenOfClubs);
      hand.hit();
      nextCard(cards.eightOfDiamonds);
      hand.hit();
      hand.outcome.should.eql('blackjack');
    });
  });
  describe('when player stands', function() {
    it('dealer should hit if under 17', function() {
      hand.playerCards = [cards.tenOfSpades, cards.sevenOfClubs];
      hand.dealerCards = [cards.tenOfSpades, cards.sixOfClubs];
      hand.stand();
      hand.dealerCards.should.have.length(3);
    });
    it('dealer should stand if at 17', function() {
      hand.playerCards = [cards.tenOfSpades, cards.sevenOfClubs];
      hand.dealerCards = [cards.tenOfSpades, cards.sevenOfClubs];
      hand.stand();
      hand.dealerCards.should.have.length(2);
    });
    it('should be a win when dealer busts', function() {
      hand.playerCards = [cards.tenOfSpades, cards.sevenOfClubs];
      hand.dealerCards = [cards.tenOfSpades, cards.sixOfClubs];
      nextCard(cards.sixOfHearts);
      hand.stand();
      hand.outcome.should.eql('win');
    });
    it('should be a loss when dealer scores higher', function() {
      hand.playerCards = [cards.tenOfSpades, cards.sevenOfClubs];
      hand.dealerCards = [cards.tenOfSpades, cards.sixOfClubs];
      nextCard(cards.twoOfHearts);
      hand.stand();
      hand.outcome.should.eql('loss');
    });
    it('should be a push when dealer scores equal', function() {
      hand.playerCards = [cards.tenOfSpades, cards.sevenOfClubs];
      hand.dealerCards = [cards.tenOfSpades, cards.sixOfClubs];
      nextCard(cards.aceOfHearts);
      hand.stand();
      hand.outcome.should.eql('push');
    });
  });
});
