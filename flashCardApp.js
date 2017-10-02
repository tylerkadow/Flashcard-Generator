var inquirer = require("inquirer");

var clozeCards = require("./clozeCards.js");

var questions = require("./questions.js").questions;

var clozeDeletedQuestions = [];

for (var i = 0; i < questions.length; i++) {
	var a = new clozeCards.ClozeCard(questions[i].full, questions[i].cloze);
	clozeDeletedQuestions.push(a);
}

var presentQuestion = 0;

var right = 0;

var wrong = 0;

function askQuestion() {
	inquirer.prompt([
			{
				type: "input",
				message: clozeDeletedQuestions[presentQuestion].partial + "\nAnswer: ",
				name: "userGuess"
			}
		]).then(function (answer) {
			if (answer.userGuess.toLowerCase() === clozeDeletedQuestions[presentQuestion].cloze.toLowerCase()) {
				console.log("\nCorrect!");
				right++;
			}
			else {
				console.log("\nWrong.");
				wrong++;
			}
			if (presentQuestion < clozeDeletedQuestions.length - 1) {
				presentQuestion++;
				askQuestion();
			}
			else {
				console.log("Game Over!");
				console.log("Correct answers: " + right);
				console.log("Wrong answers: " + wrong);

			inquirer.prompt([
				{
					type: "confirm",
					message: "Try again!",
					name: "tryAgain"
				}
			]).then(function (answer) {
				if (answer.tryAgain) {
					presentQuestion = 0;
					right = 0;
					wrong = 0;

					askQuestion();
				}
				else {
					console.log("Have a good day!")
				}
			})
		}
	})
}

askQuestion();