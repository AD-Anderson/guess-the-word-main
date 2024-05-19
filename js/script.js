const guessedletters = document.querySelector(".guessed-letters");
//console.log(guessedletters.outerHTML);
const guessButton = document.querySelector(".guess");
//console.log(guessbutton.outerHTML);
const textInput = document.querySelector("#letter");
//console.log(textinput);
const wordInProgess = document.querySelector(".word-in-progress");
//console.log(wordinprogess.outerHTML);
const guessesReamining = document.querySelector(".remaining");
//console.log(guessesreamining.outerHTML);
const span = document.querySelector("span");
//console.log(span);
const message = document.querySelector(".message");
//console.log(message);
const btn = document.querySelector(".play-again");
//console.log(btn);
const word = "magnolia";
const guessedLetters = [];

const lettertyped = function (word) {
  const lettertyped = [];
  for (const letter of word) {
    console.log(letter);
    lettertyped.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  //Empty message paragrah
  message.innerText = "";
  const guess = textInput.value;
  //console.log(guess);
  //textinput.value = "";
  const goodGuess = validateInput(guess);
  if (goodGuess) {
    // We've got a letter! Let's guess!
    makeGuess(guess);
  }
  textInput.value = "";
});

const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    message.innerText = "Please enter a letter.";
  } else if (input.length > 1) {
    message.innerText = "Please enter only one letter.";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "Please enter a valid letter from A-Z.";
  } else {
    return input;
  }
};
const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "Letter already guessed. Try again!";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
  }
};
