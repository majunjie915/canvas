var canvas = document.getElementById("canvas2"),
	context = canvas.getContext("2d"),
	radius = canvas.width/2 - 30;
var snapshotButton = document.getElementById("snapshotButton"),
	snapshotImageElement = document.getElementById("snapshotImageElement"),
	loop;
var liPing = document.getElementById("liPing");

// 绘制时钟
function drawCircle(){
	context.beginPath();
	context.arc(canvas.width/2, canvas.height/2, radius, 0 , Math.PI*2, true);
	context.stroke();
}

function drawCenter(){
	context.beginPath();
	context.arc(canvas.width/2, canvas.height/2, 5, 0, Math.PI*2, true);
	context.fillStyle = "#000";
	context.fill();
}

function drawInterval(){
	var beginPoint = {x: 0, y: 0},
		endPoint = {x: 0, y:0};

	for (var i = 0; i < 60; i++) {
		var angle = Math.PI*2/60 * i - Math.PI/2,
			interval = 5;
		if (i % 5 == 0) {interval = 10};
		beginPoint.x = canvas.width/2 + Math.cos(angle)*radius;
		beginPoint.y = canvas.height/2 + Math.sin(angle)*radius;
		endPoint.x = canvas.width/2 + Math.cos(angle)*(radius-interval);
		endPoint.y = canvas.height/2 + Math.sin(angle)*(radius-interval);

		context.beginPath();
		context.moveTo(beginPoint.x, beginPoint.y);
		context.lineTo(endPoint.x, endPoint.y);
		context.stroke();
	}

}

function drawNum(){
	var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	var numSpacing = 20;
	var font = 15;
	context.font = font+"px";
	for (var i = 0; i < nums.length; i++) {
		var angle = Math.PI*2/12 * (nums[i] - 3);
		var numWidth = context.measureText(nums[i]).width;
		context.fillText(nums[i], 
			canvas.width/2 + Math.cos(angle)*(radius+numSpacing) - numWidth/2,
			canvas.height/2 + Math.sin(angle)*(radius+numSpacing) + font/3);
	}
}

function drawHand(loc, isHour){
	var angle = Math.PI*2/60 * loc - Math.PI/2;
	var handEnd = {x: 0, y:0};
	var spaceLen = 15;
	if (isHour) {
		spaceLen = 45;
	}
	handEnd.x = canvas.width/2 + Math.cos(angle) * (radius - spaceLen);
	handEnd.y = canvas.height/2 + Math.sin(angle) * (radius - spaceLen);
	context.moveTo(canvas.width/2, canvas.height/2);
	context.lineTo(handEnd.x, handEnd.y);
	context.stroke();
}

function drawHands(){
	var date = new Date();
	var hour = date.getHours();
	// hour = hour > 12 ? hour - 12 : hour;
	hour = hour % 12;
	var minute = date.getMinutes();
	var second = date.getSeconds();

	minute = minute + second/60;
	hour = hour + minute/60;

	drawHand(hour*5, true);
	drawHand(minute, false);
	drawHand(second, false);
}


function drawClock(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	drawCircle();
	drawCenter();
	drawInterval();
	drawNum();
	drawHands();
	// 离屏
	updateClockImage();
}
loop = setInterval(drawClock, 1000);

// 打印canvas的内容 toDataURL()
snapshotButton.onclick = function(e){
	var dataUrl;

	if (snapshotButton.value == "take snapshot") {
		dataUrl = canvas.toDataURL();
		clearInterval(loop);
		snapshotImageElement.src = dataUrl;
		snapshotImageElement.style.display = "inline";
		canvas.style.display = "none";
		snapshotButton.value = "return to canvas";
	}else{
		canvas.style.display = "inline";
		snapshotImageElement.style.display = "none";
		loop = setInterval(drawClock, 1000);
		snapshotButton.value = "take snapshot";
	}
}

// 离屏canvas：不显示canvas，并将canvas的内容赋值给img展示
function updateClockImage(){
	liPing.src = canvas.toDataURL();
}