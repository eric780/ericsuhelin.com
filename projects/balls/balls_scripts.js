// JavaScript Document

var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;

var gravity = 1
var bounce_factor = 0.75;

function myball(x, y, radius, dx, dy, color){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.dx = dx;
	this.dy = dy;
	this.color = color;
}

var balls = [];
var startx;
var starty;
var starttime;                                        //creates a ball based on dragging factoring in time taken
$('#mainCanvas').mousedown(function(e){
	startx = e.pageX;
	starty = e.pageY;
	starttime = new Date().getTime();
});
$('#mainCanvas').mouseup(function(e){
	var endtime = new Date().getTime();
	var timeDifference = (endtime-starttime)/1000;
	var newball = new myball(e.pageX, e.pageY, 25, 0.02*(e.pageX - startx)/timeDifference, 0.02*(e.pageY - starty)/timeDifference, "green");
	//the decimal is a constant determined via trial&error
	balls.push(newball);
});
$('#mainCanvas').click(function(e){
	if(e.pageX < 135 && e.pageY < 60)
		clear(balls);
});

function update(){
	for(var i=0; i<balls.length; i++){
		balls[i].x += balls[i].dx;
		balls[i].y += balls[i].dy;

		balls[i].dy += gravity;
		if(balls[i].x - balls[i].radius <= 0){
			balls[i].x = balls[i].radius;
			balls[i].dx = -bounce_factor*balls[i].dx;
		}
		if(balls[i].x + balls[i].radius >= canvas.width){
			balls[i].x = canvas.width - balls[i].radius;
			balls[i].dx = -bounce_factor*balls[i].dx;
		}
		if(balls[i].y - balls[i].radius <= 0){
			balls[i].y = balls[i].radius;
			balls[i].dy = -bounce_factor*balls[i].dy;
		}
		if(balls[i].y + balls[i].radius >= canvas.height){
			balls[i].y = canvas.height - balls[i].radius;
			balls[i].dy = -bounce_factor*balls[i].dy;
		}
	}
	
}

function render(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	if(balls.length != 0){
		context.fillStyle = "black";
		context.fillRect(0, 0, 135, 60);
		context.fillStyle = "rgb(255, 255, 255)";
		context.font = "50px Arial"
		context.fillText("clear", 10, 45);
	}

	for(var i=0; i<balls.length; i++){
		drawCircle(balls[i].x, balls[i].y, balls[i].radius, "green");
	}

	if(balls.length>=50){ 
		context.font = "100px Arial";
		context.fillText("WHAT THE BALLS", canvas.width/6, canvas.width/10);
	}
}

function drawCircle(x, y, radius, color){
	context.beginPath();
	context.arc(x, y, radius, 0, 2*Math.PI, false);
	context.fillStyle=color;
	context.fill();
	context.strokeStyle-"#003300";
	context.stroke();
}

function clear(balls){
	balls.length = 0;
}

setInterval(function(){
	update();
	render();}, 1000/60);