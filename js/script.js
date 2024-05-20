const letterGuessed = document.querySelector(".guessed-letters");
//console.log(guessedletters.outerHTML);
const guessButton = document.querySelector(".guess");
//console.log(guessbutton.outerHTML);
const textInput = document.querySelector("#letter");
//console.log(textinput);
const wordInProgess = document.querySelector(".word-in-progress");
//console.log(wordinprogess.outerHTML);
const guessesRemaining = document.querySelector(".remaining");
//console.log(guessesreamining.outerHTML);
const remainingGuessesSpan = document.querySelector(".remaining span");
//console.log(span);
const message = document.querySelector(".message");
//console.log(message);
const btn = document.querySelector(".play-again");
//console.log(btn);

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
  const response = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const words = await response.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholder(word);
};

getWord();

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
    updateGuessesRemaining(guess);
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

const updateGuessesRemaining = function (guess) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(guess)) {
    // bad guess, lose a chance
    message.innerText = `Sorry, the word has no ${guess}.`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Good guess! The word has the letter ${guess}.`;
  }
  if (remainingGuesses === 0) {
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
  } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  }
};

const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
  }
};
