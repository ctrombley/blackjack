(function($) {
  var baseUrl = 'http://localhost:3000',
      $playerCards = $('.player-cards'),
      $dealerCards = $('.dealer-cards');

  $('.buttons').on('click', '.deal', function() {
    if ($(this).hasClass('disabled')) {
      return;
    }
    deal();
  }).on('click', '.hit', function() {
    if ($(this).hasClass('disabled')) {
      return;
    }
    hit();
  }).on('click', '.stand', function() {
    if ($(this).hasClass('disabled')) {
      return;
    }
    stand();
  });

  function deal() {
    $.post(baseUrl + '/deal', function(data) {
      draw(data);
      setButtonState(data.outcome);
    });
  }

  function hit() {
    $.post(baseUrl + '/hit', function(data) {
      draw(data);
      setButtonState(data.outcome);
    });
  }

  function stand() {
    $.post(baseUrl + '/stand', function(data) {
      draw(data);
      setButtonState(data.outcome);
    });
  }

  function draw(data) {
    drawCards($playerCards, data.playerCards);
    drawCards($dealerCards, data.dealerCards);
    drawOutcome(data.outcome);
    if (data.hideDealerCard) {
      drawHiddenDealerCard();
    }
  }

  function drawCards($el, cards) {
    $el.text('');
    for (var i=0; i<cards.length; i++) {
      var card = cards[i];
      $el.append('<div class="card rank-' + card.rank + ' ' + card.suit + '">');
    }
  }

  function drawHiddenDealerCard() {
    $dealerCards.append('<div class="card back">');
  }

  function drawOutcome(outcome) {
    $('.outcome').text(outcome);
  }

  function setButtonState(outcome) {
    if (outcome !== '') {
      $('.hit, .stand').addClass('disabled');
      $('.deal').removeClass('disabled');
    }
    else {
      $('.hit, .stand').removeClass('disabled');
      $('.deal').addClass('disabled');
    }
  }

}(jQuery))
