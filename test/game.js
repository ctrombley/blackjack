var should  = require('should');
var sinon   = require('sinon');
var cards   = require('./mockCards');
var Card    = require('../app/models/card');
var Dealer  = require('../app/models/dealer');
var Stats   = require('../app/models/stats');
var Game    = require('../app/models/game');

var dealer,
    stats,
    game;

beforeEach(function() {
  dealer = new Dealer();
  dealer.deal = sinon.stub();
  stats = new Stats();
  nextCards(1, [cards.tenOfSpades]);
  nextCards(2, [cards.tenOfSpades, cards.tenOfSpades]);
  game = new Game(dealer, stats);
});

function nextCards(count, cards) {
  dealer.deal.withArgs(count).returns(cards);
}

function nextCard(card) {
  dealer.deal.withArgs(1).returns([card]);
}

describe('Hand', function() {

  describe('at start of game', function() {
    it('should deal two player cards and two dealer cards', function() {
      game.deal();
      game.playerCards.should.have.length(2);
      game.dealerCards.should.have.length(2);
    });
  });

  describe('when player hits', function() {
    it('should deal one player card', function() {
      game.hit();
      game.playerCards.should.have.length(1);
      game.hit();
      game.playerCards.should.have.length(2);
    });

    it('should bust the player if over 21', function() {
      nextCard(cards.tenOfSpades);
      game.hit();
      nextCard(cards.tenOfClubs);
      game.hit();
      nextCard(cards.twoOfHearts);
      game.hit();
      game.outcome.should.eql('bust');
    });

    it('should award blackjack to the player if at 21', function() {
      nextCard(cards.sixOfSpades);
      game.hit();
      nextCard(cards.fiveOfClubs);
      game.hit();
      nextCard(cards.tenOfClubs);
      game.hit();
      game.outcome.should.eql('blackjack');
    });

    it('should award blackjack to the player if at 21 with an ace', function() {
      nextCard(cards.tenOfSpades);
      game.hit();
      nextCard(cards.tenOfClubs);
      game.hit();
      nextCard(cards.aceOfClubs);
      game.hit();
      game.outcome.should.eql('blackjack');
    });

    it('should bust the player if over 21 with multiple aces', function() {
      nextCard(cards.aceOfClubs);
      game.hit();
      nextCard(cards.aceOfHearts);
      game.hit();
      nextCard(cards.aceOfDiamonds);
      game.hit();
      nextCard(cards.tenOfClubs);
      game.hit();
      nextCard(cards.nineOfDiamonds);
      game.hit();
      game.outcome.should.eql('bust');
    });

    it('should award blackjack to the player if at 21 with multiple aces', function() {
      nextCard(cards.aceOfClubs);
      game.hit();
      nextCard(cards.aceOfHearts);
      game.hit();
      nextCard(cards.aceOfDiamonds);
      game.hit();
      nextCard(cards.tenOfClubs);
      game.hit();
      nextCard(cards.eightOfDiamonds);
      game.hit();
      game.outcome.should.eql('blackjack');
    });

    it('should award blackjack to the player if at 21 with multiple aces', function() {
      nextCard(cards.aceOfClubs);
      game.hit();
      nextCard(cards.aceOfHearts);
      game.hit();
      nextCard(cards.aceOfDiamonds);
      game.hit();
      nextCard(cards.tenOfClubs);
      game.hit();
      nextCard(cards.eightOfDiamonds);
      game.hit();
      game.outcome.should.eql('blackjack');
    });
  });
  describe('when player stands', function() {
    it('dealer should hit if under 17', function() {
      game.playerCards = [cards.tenOfSpades, cards.sevenOfClubs];
      game.dealerCards = [cards.tenOfSpades, cards.sixOfClubs];
      game.stand();
      game.dealerCards.should.have.length(3);
    });
    it('dealer should stand if at 17', function() {
      game.playerCards = [cards.tenOfSpades, cards.sevenOfClubs];
      game.dealerCards = [cards.tenOfSpades, cards.sevenOfClubs];
      game.stand();
      game.dealerCards.should.have.length(2);
    });
    it('should be a win when dealer busts', function() {
      game.playerCards = [cards.tenOfSpades, cards.sevenOfClubs];
      game.dealerCards = [cards.tenOfSpades, cards.sixOfClubs];
      nextCard(cards.sixOfHearts);
      game.stand();
      game.outcome.should.eql('win');
    });
    it('should be a loss when dealer scores higher', function() {
      game.playerCards = [cards.tenOfSpades, cards.sevenOfClubs];
      game.dealerCards = [cards.tenOfSpades, cards.sixOfClubs];
      nextCard(cards.twoOfHearts);
      game.stand();
      game.outcome.should.eql('loss');
    });
    it('should be a push when dealer scores equal', function() {
      game.playerCards = [cards.tenOfSpades, cards.sevenOfClubs];
      game.dealerCards = [cards.tenOfSpades, cards.sixOfClubs];
      nextCard(cards.aceOfHearts);
      game.stand();
      game.outcome.should.eql('push');
    });
  });
});
