var inWords = require('in-words').en;

function Card(rank, suit) {
  this.rank = rank;
  this.suit = suit;
  this.value = rankValue(rank);
  this.rankWord = humanizeRank(rank);
}

function rankValue(rank) {
  switch (rank) {
    case "A":
      return 11;
    case "J":
      return 10;
    case "Q":
      return 10;
    case "K":
      return 10;
    default:
      return parseInt(rank, 10);
  }
}

function humanizeRank(rank) {
  switch (rank) {
    case "A":
      return "ace";
    case "J":
      return "jack";
    case "Q":
      return "queen";
    case "K":
      return "king";
    default:
      return inWords(rank);
  }
}

module.exports = Card;
