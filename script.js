var player1 = 'O';//Human
var player2 = 'X';//Computer
var winnerPlaces = [[1, 4, 7],[2, 5, 8],[3, 4, 5],[6, 7, 8],[0, 3, 6],[0, 1, 2],[0, 4, 8],[2, 4, 6]]//winning areas
var cells = document.querySelectorAll('.box');
var ticArea;//Board Area
init();
function previous() { 
    window.history.back(); 
} 
var logout=function(){
	alert ("Logged out successfully");
	window.location = "../index.html"; // Redirecting to other page.
	return false;
}
//Declaring who won the game
var gFinal=function(gameWon)
{
	for (var index of winnerPlaces[gameWon.index]) {
		if(gameWon.player==player1)
		{
			document.getElementById(index).style.backgroundColor="yellow";	
		}
		else
		{
			document.getElementById(index).style.backgroundColor="pink";
		}
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', tPress, false);
	}
	if(gameWon.player==player1)
	{
		announceWin("you Win");
	}
	else
	{
		announceWin("You Lost");
	}	
}
//Initializing the Game

function init() {
	ticArea =[0,1,2,3,4,5,6,7,8];
	document.querySelector(".gameText").style.display = "none";
	var count=0;
	while(count<cells.length)
	{	
		cells[count].style.removeProperty('background-color');
		cells[count].innerText = '';
		cells[count].addEventListener('click', tPress, false);
		count++;
	}
}

function tPress(square) {
	play(square.target.id, player1)
	if (!drawVerify())
	{
		play(bPlace(), player2);
	} 
}

//Defining CSS for who won Game
function announceWin(whichPlayer) {
	document.querySelector(".gameText").style.display = "block";
	document.querySelector(".gameText .text").innerText = whichPlayer;
}
//checking for empty Squares
function emptySquares() {
	var empty=[];
	var j=0;
	for(i=0;i<ticArea.length;i++)
	{
		
		if(typeof ticArea[i]=="number")
		{
			empty[j]=ticArea[i];
			j++;
		}
	}
	return empty;
}

// returning Number of empty places
function bPlace() {
	return emptySquares()[0];
}

//returning the winning spots 
var findVictory=function(gameArea,player)
{
	var gameWon = null;
	var areas=[];
	var j=0;
	for(i=0;i<gameArea.length;i++)
	{
		if(typeof gameArea[i]!="number")
		{
			
			if(gameArea[i]==player)
			{
				areas[j]=i;
				j++;
			}
			
		}
	}
	for (var [i, w] of winnerPlaces.entries())
	{
		if (arraysEqual(w,areas))	
		{
			gameWon = {index: i, player: player};
			break;
		}
	}
	return gameWon;
}

//checking whether 2 arrays are equal
function arraysEqual(a1,a2) {
    return JSON.stringify(a1)==JSON.stringify(a2);
}

var play=function(idSquare,player)
{
	ticArea[idSquare] = player;
	document.getElementById(idSquare).innerText = player;
	var gameWon = findVictory(ticArea, player)
	if (gameWon)
	{
		gFinal(gameWon);
	} 
}

//checking for game is Tie
var drawVerify=function()
{
	if (emptySquares().length == 0)
	{
		for (var i = 0; i < cells.length; i++) 
		{
			cells[i].style.backgroundColor = "violet";
			cells[i].removeEventListener('click', tPress, false);
		}
		announceWin("Tie Game!")
		return true;
	}
	return false;
}

