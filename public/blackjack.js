(function($) {
  var baseUrl = 'http://localhost:3000',
      $playerCards = $('.player-cards'),
      $dealerCards = $('.dealer-cards'),
      $bet = $('#bet');

  $('.buttons').on('click', '.deal', function() {
    if ($(this).hasClass('disabled')) {
      return;
    }
    deal($bet.val());
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


  updateStats();

  function deal(bet) {
    $.post(baseUrl + '/deal', { bet: bet }, function(data) {
      updateStats();
      draw(data);
      setUIState(data.outcome);
    }, 'json');
  }

  function hit() {
    $.post(baseUrl + '/hit', function(data) {
      updateStats();
      draw(data);
      setUIState(data.outcome);
    });
  }

  function stand() {
    $.post(baseUrl + '/stand', function(data) {
      updateStats();
      draw(data);
      setUIState(data.outcome);
    });
  }

  function updateStats() {
    $.get(baseUrl + '/stats', function(data) {
      $('.credits').text(data.credits);
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
      $el.append('<div class="card ' + card.rankWord + ' ' + card.suit + '">');
    }
  }

  function drawHiddenDealerCard() {
    $dealerCards.append('<div class="card back">');
  }

  function drawOutcome(outcome) {
    $('.outcome').text(outcome);
  }

  function setUIState(outcome) {
    setButtonState(outcome);
    setBetState(outcome);
  }

  function setBetState(outcome) {
    if (outcome === '') {
      $bet.attr('disabled', 'disabled');
    }
    else {
      $bet.removeAttr('disabled');
    }
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
