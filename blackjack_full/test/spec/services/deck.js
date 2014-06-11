'use strict';

/**
* Tests the Deck Service
*
**/

describe('Service: Deck', function () {

  var Deck;

  beforeEach(module('blackjackApp'));

  beforeEach(inject(function (_Deck_) {
    Deck = _Deck_;
  }));


  it('should create a Deck of 52 cards', function () {

    var remainingCards = Deck.getRemainingCards();
    expect(remainingCards).toBe(52);

  });

  it('should have 40 cards remaining after drawing 12', function () {

    for (var i = 0; i < 12; i++) {
      Deck.drawCard();
    }

    expect(Deck.getRemainingCards()).toBe(40);

  });

  it('should sum up a hand of non-aces properly', function () {

    var hand = [

      {value: "two" , suit:"club"},
      {value: "three" , suit:"club"},
      {value: "four" , suit:"club"}

    ];

    expect(Deck.sumUpScore(hand)).toBe(9);

  });

  it('should sum up a hand of exploding aces properly', function () {

    var hand = [

      {value: "ten" , suit:"club"},
      {value: "ten" , suit:"club"},
      {value: "ace" , suit:"club"}

    ];

    expect(Deck.sumUpScore(hand)).toBe(21);

  });

  it('should sum up a hand of non-exploding aces properly', function () {

    var hand = [

      {value: "ten" , suit:"club"},
      {value: "ace" , suit:"club"}

    ];

    expect(Deck.sumUpScore(hand)).toBe(21);

  });



});
