// IIFE for privacy
(function(){

var playersGuess;
var winningNumber = generateWinningNumber();
var totalGuesses = 5;
var previousGuesses = [];
var hints = 0;



/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
  return Math.floor(Math.random() * (101 - 1)) + 1;
  $('#guessCount').text(totalGuesses + " guesses left");
}

// Fetch the Players Guess

function playersGuessSubmission(event){
	  playersGuess = +document.getElementById("guess").value;
    document.getElementById.value = "";
    checkGuess();
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	if (playersGuess < winningNumber){
    var digitsLow = winningNumber - playersGuess;
    $('#lowHigh').text("too low, " + guessMessage(digitsLow));  
  }
  else {
    var digitsHigh = playersGuess - winningNumber;
    $('#lowHigh').text("too high, " + guessMessage(digitsHigh));
  }
}

function guessMessage(input){
  var digits = Math.ceil(input/5)*5;
  var text = "you are within " + digits + " digits";
  return text;
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	if (playersGuess === winningNumber){
    $('#guessCount').text("YOU WIN!"); 
    $('#checkGuess').text('click "Start over!" to play again');
    $('#lowHigh').text("");
    winLose("win");
  }
  else{
    if (previousGuesses.includes(playersGuess) === true){
      $('#checkGuess').text("duplicate - guess again");
    }
    else {
      totalGuesses--;
      if (totalGuesses < 1){
        $('#guessCount').text('YOU LOSE.');
        $('#checkGuess').text('click "Start over!" to try again');
        $('#lowHigh').text("");
        winLose("lose");
      } 
      else{
        $('#checkGuess').text("guess again");
        $('#guessCount').text(totalGuesses + " guesses left");
        previousGuesses.push(playersGuess);
        lowerOrHigher();
      }    
    }
  }
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
  if (hints > 0){
    $('#lowHigh').text("you already used your hint!");
  }
  else{
    var random1 = Math.floor(Math.random() * (101 - 1)) + 1;
    var random2 = Math.floor(Math.random() * (101 - 1)) + 1;
    var hintArray = [winningNumber, random1, random2];
    hintArray = shuffleArray(hintArray);
	  $('#lowHigh').text("one of these values is the winning number: " + hintArray[0] + " " + hintArray[1] + " " + hintArray[2]);
    hints++;
  }
}

//randomize hint array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// Allow the "Player" to Play Again

function playAgain(){
  winningNumber = generateWinningNumber();
  totalGuesses = 5;
  hints = 0;
  previousGuesses = [];
  $('#guessCount').text(totalGuesses + " guesses left");
  $('#checkGuess').text("");
  $('#lowHigh').text("");
  $('#guessCount').animate({'font-size' : '24px'}, 'fast');
}

function winLose(input){
  if(input === "lose"){
    $('#guessCount').animate({'font-size' : '10px'}, 1200);
  }
  else{
    $('#guessCount').animate({'font-size' : '38px'}, 1200); 
  }
}


/* **** Event Listeners/Handlers ****  */
// click handlers
$(document).ready(function() {
  $('#guessButton').on('click', playersGuessSubmission);

  $('#hint').on('click', provideHint);

  $('#reset').on('click', playAgain);

// enter handler
  $('#guess').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      playersGuessSubmission();  
    }
  });
  
});


})();









