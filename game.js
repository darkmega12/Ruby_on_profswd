var gameBoard;
var turnNum;
var turn;
var NUM_COLUMNS = 7;
var NUM_ROWS = 6;
var endGame = false;
/*
	row = y-axis
	column = x-axis
*/

function boardInit(){
	gameBoard = [ [-2, -2, -2, -2, -2, -2, -2],
				  [-2, -2, -2, -2, -2, -2, -2],
				  [-2, -2, -2, -2, -2, -2, -2],
				  [-2, -2, -2, -2, -2, -2, -2],
				  [-2, -2, -2, -2, -2, -2, -2],
				  [-1, -1, -1, -1, -1, -1, -1]];
	endGame = false;
	turn = 0;
	turnNum = 1;
};

function markBoard(player, row, column){
	gameBoard[row][column] = player;
}

function move(row, column)
{
	player = turn % 2;
	markBoard(player, row, column);
	var end = checkEnd(player, row, column);
	turn++;
	turnNum = (turn / 2) + 1;
}

function checkEnd(player, row, column){
	var endGame = false;
	if(turn>=4)
	{
		endGame = checkHorizontal(player, row, column);
		if(endGame == true)
			return true;
		endGame = checkVertical(player, row, column);
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
		if(column >= 0 && column < NUM_COLUMNS)
		{
			if(gameBoard[row][column] == player)
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
		if(row >= 0 && row < NUM_ROWS)
		{
			if(gameBoard[row][column] == player)
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
	for(var i = -4; i < 4; i++)
	{
		if(row - i >= 0 && row + i < NUM_ROWS && column + i >= 0 && column + i < NUM_COLUMNS)
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

function reset()
{
	$(".buttons").css("background-color", "white");
}
