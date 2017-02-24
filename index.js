var state, board;

$('.game').hide();

$('#newgamebut').click(function(){
	$('.game').show();
	$('#newgame').hide();
	startGame();
})

function strike(el) {
	var im = state ? 'o':'x';
	el.prepend('<img src="images/'+im+'.png" />');
	el.addClass(im)
	board[el[0].id] = im;
	state = !state;
	checkGrid();
	if(state)
		computerTurn();
};

function getEmptyBlocks(){
	return $('.block').filter(function(){
		return ! ($(this).hasClass('x') || $(this).hasClass('o'))
	})
}

function getEmptyBoard(){
	return board.filter(function(val){
		return !(val == 'x' || val == 'o');
	})
}

function checkGrid(){
	var blankspace = getEmptyBlocks()
	if(winning('x'))
		gameOver('x')
	else if(winning('o'))
		gameOver('o')
	else if(blankspace.length == 0)
		gameOver();
}

function gameOver(player){
	setTimeout(function(player){
		var str
		if(player)
			str = player+' won.'
		else
			str = 'tie.'
		if(confirm(str + ' Start new game ?')){
			$('.block').map(function(){
				$(this).empty();
				$(this).unbind('click');
				$(this).removeClass('x')
				$(this).removeClass('o')
			})
			$('#newgame').show();
			$('.game').hide();
		}
	},300,player)
}

function computerTurn(){
	var options = getEmptyBoard()
	$('#'+options[Math.floor(Math.random()*options.length)]).trigger('click');
}

function startGame(){
	state = false;
	board = [0,1,2,3,4,5,6,7,8];
	$('.game > div > div').click(function(){
		$(this).unbind('click');
		strike($(this));
	})
}

// winning combinations using the board indexies
function winning(player){
	return (
		(board[0] == player && board[1] == player && board[2] == player) ||
		(board[3] == player && board[4] == player && board[5] == player) ||
		(board[6] == player && board[7] == player && board[8] == player) ||
		(board[0] == player && board[3] == player && board[6] == player) ||
		(board[1] == player && board[4] == player && board[7] == player) ||
		(board[2] == player && board[5] == player && board[8] == player) ||
		(board[0] == player && board[4] == player && board[8] == player) ||
		(board[2] == player && board[4] == player && board[6] == player)
	)
		
}