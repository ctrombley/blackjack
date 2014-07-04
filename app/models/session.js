function Session() {
  this.credits = 1000;
  this.hands = [];
  this.currentHand = null;
}

Session.prototype.newHand = function() {
   this.currentHand = new Hand();

   return currentHand.deal();
};
