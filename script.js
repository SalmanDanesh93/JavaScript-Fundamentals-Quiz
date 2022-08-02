// Set variable for score and timer
var score = document.getElementById("scores");
var timer;

// Set function for display show of form quiz and initiation of onTimer & popalte
function myFunction() {
  var x = document.getElementById("quiz");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
    onTimer();
    populate();
  }
} 

// Set time (seconds) to 60 seconds(1 minute)
i = 60;
// Create onTimer function
function onTimer() {
  document.getElementById('mycounter').innerHTML = i;
  i--;
  // Generates alert for end of quiz one time reaches 0 & displays the showScores() display element.
  if (i < 0) {
    alert('Quiz Over!');
    showScores();
  }
  else {
    clearInterval(i);
    setTimeout(onTimer, 1000);
    isEnded();
  }
}

// Function that hides timer when quiz ends
function stopTimer() {
  i = null;
}

// Generates functions for score, and format of questions
function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;

}

// Use of Quiz.prototype.getQuestionIndex to create the form for the question and retrives the list
Quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex];
}

// if statement for answer evaluation. Adds score if correct
Quiz.prototype.guess = function(answer) {
  if(this.getQuestionIndex().isCorrectAnswer(answer)) {
      this.score++;
  }
  this.questionIndex++;
}

// end of quiz life. Identifies questionIndex relevant to questions.length.
Quiz.prototype.isEnded = function() {
  return this.questionIndex === this.questions.length;
}

function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

// Function on user selection of question 
Question.prototype.isCorrectAnswer = function(choice) {
  return this.answer === choice;
}

// Populate function shows for end of quiz events and format to load question and add to list and show progress
function populate() {
  if(quiz.isEnded()) {
      showScores();
      stopTimer();
  }
  else {
      // Creates question element
      var element = document.getElementById("question");
      element.innerHTML = quiz.getQuestionIndex().text;

      // Displays question options
      var choices = quiz.getQuestionIndex().choices;
      for(var i = 0; i < choices.length; i++) {
          var element = document.getElementById("choice" + i);
          element.innerHTML = choices[i];
          guess("btn" + i, choices[i]);
      }
      showProgress();
  }
};

// provides function for button click interaction within the quiz on questions
function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function() {
      quiz.guess(guess);
      populate();
  }
};

// Creates element at footer of form displaying progress out of total questions
function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

// Displays scores when quiz questions are complete or timer reaches 0
function showScores() {
  var gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
  var element = document.getElementById("quiz");
  // Creates button and input for user to display score
  var sText = "<input id=userInput type=text placeholder=User>";
  var saveBtn = "<button onclick=returnText()> Submit </button>"
  element.innerHTML = gameOverHTML + sText + saveBtn;
};

// Creates user input score alert
function returnText(){
  let input = document.getElementById("userInput").value;
  alert(input + "'s score = " + quiz.score);
}

// Creates list of questions to be pulled into the quiz
var questions = [
  new Question("JavaScript File Has An Extension of: ?", [".Java", ".Js",".javascript", ".xml"], ".Js"),
  new Question("Event is Used To Check An Empty Text Box:", ["Onclick()", "OnFocus()", "OnBlur()", "None"], "OnBlur()"),
  new Question("Which Of The Dialog Box Display a Message And a Data Entry Field?", ["Alert()", "Prompt()","Confirm()", "Msg()"], "Prompt()"),
  new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
  new Question("If Button is clicked ...Event Handler is invoked.", ["OnSubmit()", "OnLoad()", "IsPostBack()", "Onclick()"], "Onclick()")
];

// Creates quiz element with questions
var quiz = new Quiz(questions);

// Displays compiled quiz with questions and answers
populate();

// Creates button element for reload function
const reloadButton = document.querySelector("#reload");
// location.reload function reload the page
function reload() {
    reload = location.reload();
}
reloadButton.addEventListener("click", reload, false);