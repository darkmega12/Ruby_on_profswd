var gameBoard;
var turnNum;
var turn;
var player;
var NUM_COLUMNS = 7;
var NUM_ROWS = 6;
var startGame = false;
/*
	row = y-axis
	column = x-axis
*/

function start()
{
	if(startGame == false)
	{
		startGame = true;
		boardInit();
	}
}


function reset()
{
	startGame = false;
	boardInit();
	$("td").css("background-color", "white");
}

function boardInit(){
	gameBoard = [ [-2, -2, -2, -2, -2, -2, -2],
				  [-2, -2, -2, -2, -2, -2, -2],
				  [-2, -2, -2, -2, -2, -2, -2],
				  [-2, -2, -2, -2, -2, -2, -2],
				  [-2, -2, -2, -2, -2, -2, -2],
				  [-1, -1, -1, -1, -1, -1, -1]];
	turn = 0;
	turnNum = 1;
	player = 0;
};

function checkWritable(row, column)
{
	if(gameBoard[row][column] == -1)
		return true;
	else
		return false;
}

function markBoard(player, row, column){
	gameBoard[row][column] = player;
	if(row - 1 >= 0)
		gameBoard[row-1][column] = -1;
}

function move(row, column)
{ 
	if(startGame == true)
	{	
		markBoard(player, row, column);
		var end = checkEnd(player, row, column);
		if(checkEnd(player, row, column) == true)
		{
			alert("Player " + (player + 1) + " wins!");
			startGame = false;
		}
		else
		{
			turn++;
			turnNum = (turn / 2) + 1;
		    player = turn % 2;
		    console.log("current turn: " + turnNum + " player: " + player); 
		}
	}
}

function checkEnd(player, row, column){
	var endGame;
	if(turn>=4)
	{
		endGame = checkHorizontal(player, row, column);
		if(endGame == true)
			return true;
		endGame = checkVertical(player, row, column);
		if(endGame == true)
			return true;
		endGame = checkHorizontal(player, row, column);
		if(endGame == true)
			return true;
		endGame = checkDiagonal(player, row, column);
		if(endGame == true)
			return true;
	}
	return false;
}


function checkHorizontal(player, row, column){
	var connect = 0;
	for(var i= column - 3; i < column + 4; i++)
		if(i >= 0 && i < NUM_COLUMNS)
		{
			if(gameBoard[row][i] == player)
				connect++;
			else
				connect = 0;
			if(connect == 4)
				return true;
		}
	return false;
}

function checkVertical(player, row, column){
	var connect = 0;
	for(var i = row - 3; i < row + 4; i++)
		if(i >= 0 && i < NUM_ROWS)
		{
			if(gameBoard[i][column] == player)
				connect++;
			else
				connect = 0;
			if(connect == 4)
				return true;
		}
}

function checkDiagonal(player, row, column)
{
	var connect = 0;
	for(var i=-4; i < 4;i++)
	{
		if(row + i >= 0 && row + i < NUM_ROWS && column + i >= 0 && column + i < NUM_COLUMNS)
		{
			if(gameBoard[row + i][column + i] == player)
				connect++;
			else
				connect = 0;
			if(connect == 4)
				return true;
		}
	}
	connect = 0;
	for(var i = -4; i < 4; i++)
	{
		if(row - i >= 0 && row - i < NUM_ROWS && column + i >= 0 && column + i < NUM_COLUMNS)
		{
			if(gameBoard[row - i][column + i] == player)
				connect++;
			else
				connect = 0;
			if(connect == 4)
				return true;
		}
	}
	return false;
}

/*

*/