var canvas = document.getElementById("canvas"),
	context = canvas.getContext("2d"),
	rubberbandDiv = document.getElementById("rubberbandDiv"),
	resetButton = document.getElementById("resetButton"),
	image = new Image(),
	mousedown = {},
	rubberbandRectangle = {},
	dragging = false;

function rubberbandStar(x, y){
	mousedown.x = x;
	mousedown.y = y;
	
}