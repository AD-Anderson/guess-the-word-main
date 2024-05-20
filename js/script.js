const letterGuessed = document.querySelector(".guessed-letters");
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

const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgess.innerText = placeholderLetters.join("");
};
// const lettertyped = function (word) {
//   const lettertyped = [];
//   for (const letter of word) {
//     console.log(letter);
//     lettertyped.push("●");
//   }

placeholder(word);

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
    showLetterGuessed();
    updateWordInProgress(guessedLetters);
  }
};
const showLetterGuessed = function () {
  letterGuessed.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    letterGuessed.append(li);
  }
};
const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }
  wordInProgess.innerText = revealWord.join("");
  checkIfWin();
};
const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
  }
};
