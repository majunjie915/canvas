var canvas = document.getElementById("canvas"),
	context = canvas.getContext("2d"),
	readout = document.getElementById("readout"),
	spritesheet = new Image();

function windowToCanvas(canvas, x, y){
	var bbox = canvas.getBoundingClientRect();
	return {
		x: x - bbox.left * (canvas.width / bbox.width),
		y: y - bbox.top * (canvas.height / bbox.height)
	};
}

function drawBackground(){
	var verticalLineSpacing = 12,
		i = context.canvas.height;

	context.clearRect(0, 0, canvas.width, canvas.height);
	context.strokeStyle = "lightgray";
	context.lineWidth = 0.5;

	while(i > verticalLineSpacing * 4){
		context.beginPath();
		context.moveTo(0, i);
		context.lineTo(canvas.width, i);
		context.stroke();
		i -= verticalLineSpacing;
	}
}

function drawSpritesheet(){
	context.drawImage(spritesheet, 0, 0);
}

function drawGuidelines(x, y){
	context.strokeStyle = "rgba(0, 0, 230, 0.8)";
	context.lineWidth = 0.5;
	drawVerticalLine(x);
	drawHorizontalLine(y);
}

function updateReadout(x, y ){
	readout.innerText = '('+x.toFixed(0)+', '+y.toFixed(0)+')'
}

function drawHorizontalLine(y){
	context.beginPath();
	context.moveTo(0, y+0.5);
	context.lineTo(context.canvas.width, y+0.5);
	context.stroke();
}

function drawVerticalLine(x){
	context.beginPath();
	context.moveTo(x+0.5, 0);
	context.lineTo(x+0.5, context.canvas.height);
	context.stroke();
}

// 事件
canvas.onmousemove = function(e){
	var loc = windowToCanvas(canvas, e.clientX, e.clientY);

	drawBackground();
	drawSpritesheet();
	drawGuidelines(loc.x, loc.y);
	updateReadout(loc.x, loc.y);
}

spritesheet.src = "../images/running_sprite_sheet_03.png";
spritesheet.onload = function(e){
	drawSpritesheet();
}

drawBackground();