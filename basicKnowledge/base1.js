var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

context.font = "38pt Arial";
context.fillStyle = "cornflowerblue";
context.strokeStyle = "blue";
context.fillText("Hello canvas", canvas.width/2 - 150,canvas.height/2 + 15);
context.strokeText("Hello canvas", canvas.width/2 - 150, canvas.height/2 + 15);

var canvas2 = document.getElementById("canvas2"),
	context2 = canvas2.getContext("2d"),
	font_height = 15,
	margin = 35,
	hand_truncation = canvas2.width/25,
	hour_head_truncation = canvas2.width/10,
	numeral_spacing = 20,
	radius = canvas2.width/2 - margin,// 时钟半径
	hand_radius = radius + numeral_spacing;

function drawCircle(){
	context2.beginPath();
	context2.arc(canvas2.width/2, canvas2.height/2, radius, 0, Math.PI*2, true);
	context2.stroke();
}

function drawNumerals() {
	var numerals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
		angle = 0,
		numeralWidth = 0;

	numerals.forEach(function(numeral){
		angle = Math.PI/6 * (numeral-3);
		numeralWidth = context2.measureText(numeral).width;
		context2.fillText(numeral, 
			canvas2.width/2 + Math.cos(angle)*(hand_radius) - numeralWidth/2,
			canvas2.height/2 + Math.sin(angle)*(hand_radius) + font_height/3);

	});
}

function drawCenter(){
	context2.beginPath();
	context2.arc(canvas2.width/2, canvas2.height/2, 5, 0, Math.PI*2, true);
	context2.fill();
}

function drawHand(loc, isHour){
	var angle = (Math.PI*2) * (loc/60) - Math.PI/2,
		handRadius = isHour ? radius - hand_truncation - hour_head_truncation
			: radius - hand_truncation;

	context2.moveTo(canvas2.width/2, canvas2.height/2);
	context2.lineTo(canvas2.width/2 + Math.cos(angle)*handRadius,
					canvas2.height/2 + Math.sin(angle)*handRadius);
	context2.stroke();
}

function drawHands(){
	var date = new Date(),
		hour = date.getHours();
	
	hour = hour > 12 ? hour-12 : hour;
	
	drawHand(hour*5 + (date.getMinutes()/60)*5, true, 0.5);
	drawHand(date.getMinutes(), false, 0.5);
	drawHand(date.getSeconds(), false, 0.2)
}

function drawClock(){
	context2.clearRect(0, 0, canvas2.width, canvas2.height);

	drawCircle();
	drawCenter();
	drawHands();
	drawNumerals();
}

context2.font = font_height + "px Arial";
loop = setInterval(drawClock, 1000);