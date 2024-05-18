const guessedletters = document.querySelector(".guessed-letters");
//console.log(guessedletters.outerHTML);
const guessbutton = document.querySelector(".guess");
//console.log(guessbutton.outerHTML);
const textinput = document.querySelector("#letter");
//console.log(textinput);
const wordinprogess = document.querySelector(".word-in-progress");
//console.log(wordinprogess.outerHTML);
const guessesreamining = document.querySelector(".remaining");
//console.log(guessesreamining.outerHTML);
const span = document.querySelector("span");
//console.log(span);
const message = document.querySelector(".message");
//console.log(message);
const btn = document.querySelector(".play-again");
//console.log(btn);
const word = "magnolia";

const lettertyped = function (word) {
  const lettertyped = [];
  for (const letter of word) {
    console.log(letter);
    lettertyped.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

guessbutton.addEventListener("click", function (e) {
  e.preventDefault();
  const guess = textinput.value;
  console.log(guess);
  textinput.value = "";
});
