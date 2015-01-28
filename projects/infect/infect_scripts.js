var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");
context.canvas.width = (0.6)*window.innerWidth;
context.canvas.height = (0.4)*window.innerWidth;

var board = [];
var boardwidth = canvas.height;
var boardheight = boardwidth;
var dimension = 15;
var joinedindeces = [0];
var colors = ["red", "blue", "green", "yellow"];
var moves = 0;
var buttons_enabled = true;

var input = {};
$('#options').submit(function(e){
	e.preventDefault();
	$.each($("form").serializeArray(), function(){
		input[this.name] = parseInt(this.value);
	});
	dimension = input.size;
	moves = Math.floor(dimension*1.5); //difficulty determines number of moves. 1.5x for normal. need testing to determine
										//the smaller the board, the harder it is with a multiplier
	$("#menu").addClass("hidden");
	$("#mainCanvas").removeClass("hidden");
	$("#score").removeClass("hidden");
	initialize();
});


function createBoard(){   //each entry in board is an array with first index being a color, second being 1 if joined, 0 if not.
	board[0] = [Math.floor(Math.random()*4), 1];						//very first tile starts as joined
	for(var i=1; i<dimension*dimension; i++){
		board[i] = [Math.floor(Math.random()*4), 0];
	}
	$('#score').html("Moves remaining: " + moves);
}


function redraw(){
	context.clearRect(0, 0, boardwidth, boardheight)
	for(var r=0; r<dimension; r++){
		for(var c=0; c<dimension; c++){
			context.fillStyle = colors[board[r*dimension + c][0]];
			context.fillRect(c*(boardwidth/dimension), r*(boardheight/dimension), (boardwidth/dimension), (boardheight/dimension))
		}
	}
}

function drawButtons(){
	context.beginPath();
	context.rect(boardwidth + 50, 25, 50, 50);
	context.fillStyle="red";
	context.fill();
	context.lineWidth=3;
	context.strokeStyle = "black";
	context.stroke();

	context.beginPath();
	context.rect(boardwidth + 50, 75, 50, 50);
	context.fillStyle="blue";
	context.fill();
	context.lineWidth=3;
	context.strokeStyle = "black";
	context.stroke();

	context.beginPath();
	context.rect(boardwidth + 50, 125, 50, 50);
	context.fillStyle="green";
	context.fill();
	context.lineWidth=3;
	context.strokeStyle = "black";
	context.stroke();

	context.beginPath();
	context.rect(boardwidth + 50, 175, 50, 50);
	context.fillStyle="yellow";
	context.fill();
	context.lineWidth=3;
	context.strokeStyle = "black";
	context.stroke();
}
//loop through each joined tile
//check its 4 neighbors to see if they would be the same color
//if so, mark the neighbor as joined
//change all the colors
function update(color){
	moves--;
	$('#score').html("Moves remaining: " + moves);
	for(var k=0; k<board.length; k++){ //updates all joined tiles
		if(board[k][1] == 1)
			updateNeighbors(k, color);
	}
	for(var k=0; k<board.length; k++){ //changes color for newly joined tiles
		if(board[k][1] == 1)
			board[k][0] = color;
	}
	if(gameWon()){
		context.font = "30px Verdana";
		context.fillStyle = "black";
		context.fillText("win!", boardwidth + 50, 400);
	}
	else if(gameLost()){
		context.font = "30px Verdana";
		context.fillStyle = "black";
		context.fillText("YOU LOST", boardwidth+50, 400);
		buttons_enabled = false;
	}
}

function updateNeighbors(index, color){
	if(board[index][1] == 1){ //if tile is marked as joined
		if(index-1>=0 && index%dimension != 0){ //check its up, left, right, down neighbors
			if(board[index-1][0] == color && board[index-1][1] != 1){
				board[index-1][1] = 1;
				joinedindeces.push(index-1);
				updateNeighbors(index-1, color);
			}}
		if(index+1<board.length && (index+1)%dimension != 0){
			if(board[index+1][0] == color && board[index+1][1] != 1){
				board[index+1][1] = 1;
				joinedindeces.push(index+1);
				updateNeighbors(index+1, color);
			}}
		if(index-dimension>=0){
			if(board[index-dimension][0] == color && board[index-dimension][1] != 1){
				board[index-dimension][1] = 1;
				joinedindeces.push(index-dimension);
				updateNeighbors(index-dimension, color);
			}}
		if(index+dimension <board.length){
			if(board[index+dimension][0] == color && board[index+dimension][1] != 1){
				board[index+dimension][1] = 1;
				joinedindeces.push(index+dimension);
				updateNeighbors(index+dimension, color);
			}}
	}

}

function gameWon(){
	return joinedindeces.length == dimension*dimension;
}
function gameLost(){
	return moves <= 0;
}

function initialize(){
	createBoard();
	redraw();
	drawButtons();
	updateNeighbors(0, board[0][0]);
}


$('#mainCanvas').click(function(e){
	var x = e.pageX - canvas.offsetLeft;
	var y = e.pageY - canvas.offsetTop;
	if(x >= boardwidth+50 && x <= boardwidth+50+50 && buttons_enabled){
		if(y >= 25 && y <= 25+50){
			update(0);
		}
		else if(y >= 75 && y <= 75+50){
			update(1);
		}
		else if(y >= 125 && y<= 125+50){
			update(2);
		}
		else if(y >= 175 && y <= 175+50){
			update(3);
		}
	}
	redraw();
});
