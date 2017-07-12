var canvas = document.getElementById("canvas"),
	context = canvas.getContext("2d"),
	rubberbandDiv = document.getElementById("rubberbandDiv"),
	resetButton = document.getElementById("resetButton"),
	image = new Image(),
	mousedown = {},// 记录起点
	rubberbandRectangle = {},// 记录放大区域
	dragging = false;

function rubberbandStart(x, y){
	mousedown.x = x;
	mousedown.y = y;
	
	rubberbandRectangle.left = mousedown.x;
	rubberbandRectangle.top = mousedown.y;

	moveRubberbandDiv();
	showRubberbandDiv();

	dragging = true;
}

function rubberbandStretch(x, y){
	rubberbandRectangle.left = x < mousedown.x ? x : mousedown.x;// 取小值
	rubberbandRectangle.top = y < mousedown.y ? y : mousedown.y;// 取小值

	rubberbandRectangle.width = Math.abs(x - mousedown.x);
	rubberbandRectangle.height = Math.abs(y - mousedown.y);

	moveRubberbandDiv();
	resizeRubberbandDiv();
}

function rubberbandEnd(){
	var bbox = canvas.getBoundingClientRect();// 包含元素的top、right、bottom、left、width、height值的对象
	console.log(bbox);
	 try{
	 	context.drawImage(canvas,// 已经渲染在画布上的图片
	 		rubberbandRectangle.left-bbox.left,// 截取的横坐标（相对于canvas的坐标）
	 		rubberbandRectangle.top-bbox.top,// 截取的纵坐标
	 		rubberbandRectangle.width,// 截取的宽
	 		rubberbandRectangle.height,// 截取的高
	 		0,0,canvas.width,canvas.height); // 放置在画布上的位置
	 }catch(e){

	 }

	 resetRubberbandRectangle();

	 rubberbandDiv.style.width = 0;
	 rubberbandDiv.style.height = 0;

	 hideRubberbandDiv();

	 dragging = false;
}

function moveRubberbandDiv(){
	rubberbandDiv.style.left = rubberbandRectangle.left+"px";
	rubberbandDiv.style.top = rubberbandRectangle.top+"px";
}

function resizeRubberbandDiv(){
	rubberbandDiv.style.width = rubberbandRectangle.width+"px";
	rubberbandDiv.style.height = rubberbandRectangle.height+"px";
}

function showRubberbandDiv(){
	rubberbandDiv.style.display = "inline";
}

function hideRubberbandDiv(){
	rubberbandDiv.style.display = "none";
}

function resetRubberbandRectangle(){
	rubberbandRectangle = {top: 0, left: 0, width: 0, height:0};
}

// 事件
canvas.onmousedown = function(e){
	var x = e.clientX,
		y = e.clientY;

	e.preventDefault();
	rubberbandStart(x, y);
}

window.onmousemove = function(e){
	var x = e.clientX,
		y = e.clientY;

	e.preventDefault();
	if (dragging) {
		rubberbandStretch(x, y);
	}
}

window.onmouseup = function(e){
	e.preventDefault();
	rubberbandEnd();
}

image.onload = function(){
	context.drawImage(image, 0, 0, canvas.width, canvas.height);
}

resetButton.onclick = function(e){
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	context.drawImage(image, 0, 0, canvas.width, canvas.height);
}

image.src = "../images/running_sprite_sheet.jpg";