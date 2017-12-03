var questionNumber = -1;
var infoTimer;
var secondTimer;
var questionTime = 5; // Seconds to Read and Answer Question
var infoTime = 15;  // Milliseconds per letter to read info
var totalTime = 0;

function LoadQuestion() {
	clearInterval(secondTimer);
	clearTimeout(infoTimer);
	questionNumber++;
	if (questionNumber >= triviaArray.length) questionNumber = 0;
	$(".questionLine").text(triviaArray[questionNumber].Question);
	$(".infoLine").html("<br>");
	$(".triviaButton").each(function() {
		$(this).removeClass("wrong");
		$(this).removeClass("right");
		$(this).text(triviaArray[questionNumber].Answers[$(this).attr("id")]);
	});
	totalTime = questionTime;
	$(".timerLine").text("You have " + totalTime + " seconds left to answer this question");
	secondTimer = setInterval(function () {TickTock()}, 1000);
	$(".triviaButton").on("click", function() {
		$(".triviaButton").off("click");	
		clearInterval(secondTimer);
		$(this).addClass("wrong");
		$("#" + triviaArray[questionNumber].Correct).removeClass("wrong").addClass("right")
		$(".timerLine").html("<br>");
		$(".infoLine").text(triviaArray[questionNumber].Info);
		infoTimer = setTimeout(function () {ClearInfo()}, infoTime*triviaArray[questionNumber].Info.length);
	});
};

function TickTock() {
	totalTime--;
	$(".timerLine").text("You have " + totalTime + " seconds left to answer this question");
	if (totalTime === 0) {
		$(".triviaButton").off("click")	;
		clearInterval(secondTimer);
		$(".timerLine").text("You have ran out of time to answer this question");
		$("#" + triviaArray[questionNumber].Correct).addClass("right") // Mark Correct on Green
		$(".infoLine").text(triviaArray[questionNumber].Info);
		infoTimer = setTimeout(function () {ClearInfo()}, infoTime*triviaArray[questionNumber].Info.length);
	}
};

function ClearInfo() {
	LoadQuestion();
};

$(document).ready(function() {
	LoadQuestion();
});