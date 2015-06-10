'use strict';
/*globals app*/

/*
                              ##                        ###      ###
   ####                       ##                         ##       ##
  ##  ##                      ##                         ##       ##
 ##        #####   ## ###   ######   ## ###    #####     ##       ##      #####   ## ###    #####
 ##       ##   ##  ###  ##    ##     ###      ##   ##    ##       ##     ##   ##  ###      ##
 ##       ##   ##  ##   ##    ##     ##       ##   ##    ##       ##     #######  ##        ####
  ##  ##  ##   ##  ##   ##    ##     ##       ##   ##    ##       ##     ##       ##           ##
   ####    #####   ##   ##     ###   ##        #####    ####     ####     #####   ##       #####

*/

 app.controller('GameController',

    ["$scope", "Deck", "$timeout",

    function($scope, Deck, $timeout){

      var dealerScore = null;
      var playerScore = null;

      $scope.dealerRoundsWon = 0;
      $scope.playerRoundsWon = 0;

      $scope.gameOver = false;

      newHand();

      //draw cards, checking for instant lose condition (>21)
      $scope.hit = function(){

        $scope.playerCards.push(Deck.drawCard());
        playerScore = Deck.sumUpScore($scope.playerCards);

        $timeout(function(){

          if (playerScore > 21){
            showScores();
            swal({   title: "Busted!",   text: "You went over 21!",   type: "error",   confirmButtonText: "Darn" });
            $scope.dealerRoundsWon++;
            newHand();
          }

        },300);

      };

      //dealers draws till 17 or greater and either fails or checks win condition
      $scope.stand = function() {

        dealerScore = Deck.sumUpScore($scope.dealerCards);
        if (dealerScore < 17){
          console.log("dealer draws a card");
          $scope.dealerCards.push(Deck.drawCard());
          $timeout($scope.stand,700);//pause for dramatic effect
        }
        else if (dealerScore > 21){
          showScores();
          swal({   title: "Dealer Busts!",   text: "Guess he didn't see that coming.",   type: "success",   confirmButtonText: "Haha!" });
          $scope.playerRoundsWon++;
          newHand();
        }
        else {
          showScores();
          if (playerScore === dealerScore){
            swal({   title: "Tie!",   text: "At least you didn't lose.",   type: "info",   confirmButtonText: "Ok" });
            newHand();
          }
          else if (playerScore > dealerScore){
            swal({   title: "You Win!",   text: "Congratulations and stuff.",   type: "success",   confirmButtonText: "Yay!" });
            $scope.playerRoundsWon++;
            newHand();
          }
          else if (playerScore < dealerScore){
            swal({   title: "You Lose!",   text: "Try again next time.",   type: "error",   confirmButtonText: "= (" });
            $scope.dealerRoundsWon++;
            newHand();
          }
        }

      };

      function newHand(){

        console.log("changing to true!");
        $scope.gameOver = true;

        $timeout(function(){

          //shuffle at halfway point
          if (Deck.getRemainingCards() < 26){
            console.log('Reshuffling Deck');
            Deck.reshuffleDeck();
          }

          $scope.dealerCards = [Deck.drawCard(), Deck.drawCard()];
          $scope.playerCards = [Deck.drawCard(), Deck.drawCard()];

          dealerScore = Deck.sumUpScore($scope.dealerCards);
          playerScore = Deck.sumUpScore($scope.playerCards);

          $scope.gameOver = false;

        }, 800);

      }

      var showScores =  function(){
        console.log("<======= Player:", playerScore, "--- Dealer:", dealerScore, "=========>");
      };


 }]);