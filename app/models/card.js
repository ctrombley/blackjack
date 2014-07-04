function Card(rank, suit) {
  this.rank = rank;
  this.suit = suit;
}

Card.prototype.value = function() {
  switch (this.rank) {
    case "A":
      return 11;
    case "J":
      return 10;
    case "Q":
      return 10;
    case "K":
      return 10;
    default:
      return parseInt(this.rank, 10);
  }
};

module.exports = Card;
