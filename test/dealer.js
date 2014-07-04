var should = require('should');
var Card = require('../app/models/card');
var Dealer = require('../app/models/dealer');

var dealer;

beforeEach(function() {
  dealer = new Dealer();
});

describe('Dealer', function() {
  it('should create a stack of 52 cards when using 1 deck', function() {
    dealer.cards.should.have.length(52);
  });

  it('should create a stack of 104 cards when using 2 decks', function() {
    dealer = new Dealer(2);
    dealer.cards.should.have.length(104);
  });

  it('should randomize card order when shuffling', function() {
    var copyOfOrderedCardStack = dealer.cards.slice();
    dealer.cards.should.match(copyOfOrderedCardStack);
    dealer.shuffle(1);
    dealer.cards.should.not.match(copyOfOrderedCardStack);
  });

  it('should return an array of cards', function() {
    var cards = dealer.deal(2);
    cards.should.have.length(2);
    cards.should.be.an.instanceOf(Array);
    cards[0].should.be.an.instanceOf(Card);
  });

  it('should remove card from stack when dealing', function() {
    dealer.deal(2);
    dealer.cards.should.have.length(50);
    dealer.deal(1);
    dealer.cards.should.have.length(49);
  });

  it('should create new stack and reshuffle after dealing final card', function() {
    dealer.deal(52);
    dealer.cards.should.have.length(52);
    dealer.deal(54);
    dealer.cards.should.have.length(50);
  });
});
