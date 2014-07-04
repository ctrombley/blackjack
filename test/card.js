var should = require('should');
var cards = require('./mockCards');
var Card  = require('../app/models/card');

describe('Card', function() {
  it('should return the correct value for each rank', function() {
      cards.aceOfSpades.value().should.eql(11);
      cards.twoOfSpades.value().should.eql(2);
      cards.threeOfSpades.value().should.eql(3);
      cards.fourOfSpades.value().should.eql(4);
      cards.fiveOfSpades.value().should.eql(5);
      cards.sixOfSpades.value().should.eql(6);
      cards.sevenOfSpades.value().should.eql(7);
      cards.eightOfSpades.value().should.eql(8);
      cards.nineOfSpades.value().should.eql(9);
      cards.tenOfSpades.value().should.eql(10);
      cards.jackOfSpades.value().should.eql(10);
      cards.queenOfSpades.value().should.eql(10);
      cards.kingOfSpades.value().should.eql(10);
  });
});
