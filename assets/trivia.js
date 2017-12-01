var questionNumber = -1;
var infoTimer;
var secondTimer;
var totalTime = 0;

function LoadQuestion() {
	clearInterval(secondTimer);
	clearTimeout(infoTimer);
	questionNumber++;
	if (questionNumber >= triviaArray.length) questionNumber = 0;
	$('.questionLine').text(triviaArray[questionNumber].Question);
	$('.infoLine').html('<br>');
	$('.right').css('background-color', 'white');
	$('.triviaButton').each(function() {
		var id = $(this).attr('id');
		var idx = parseInt(id.substr(id.length - 1));
		var txt = triviaArray[questionNumber].Answers[idx];
		$(this).removeClass('wrong');
		$(this).removeClass('right');
		if (txt.substr(0,1) === '*') {
			$(this).addClass('right');
			txt = txt.substr(1);
		}
		$(this).text(txt);
	});
	totalTime = 3;
	$('.timerLine').text("You have " + totalTime + " seconds left to answer this question");
	secondTimer = setInterval(function () {TickTock()}, 1000);
	$('.triviaButton').on('click', function() {
		$('.triviaButton').off('click');	
		clearInterval(secondTimer);
		if (!($(this).hasClass('right'))) $(this).addClass('wrong');
		$('.right').css('background-color', 'green');
		$('.timerLine').html('<br>');
		$('.infoLine').text(triviaArray[questionNumber].Info);
		infoTimer = setTimeout(function () {ClearInfo()}, 25*triviaArray[questionNumber].Info.length);
	});
};

function TickTock() {
	totalTime--;
	$('.timerLine').text("You have " + totalTime + " seconds left to answer this question");
	if (totalTime === 0) {
		$('.triviaButton').off('click')	;
		clearInterval(secondTimer);
		$('.right').css('background-color', 'green');
		$('.infoLine').text(triviaArray[questionNumber].Info);
		infoTimer = setTimeout(function () {ClearInfo()}, 25*triviaArray[questionNumber].Info.length);
	}
}

function ClearInfo() {
	LoadQuestion();
}

$(document).ready(function() {
	LoadQuestion();
});