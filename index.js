$(document).ready(function(){

	var state = true;
	
	$('.game').hide();

	$('#newgamebut').click(function(){
		$('.game').show();
		$('#newgame').hide();
		startGame();
	})

})


function strike(el) {
	var im = state ? 'x':'o';
	el.prepend('<img src="images/'+im+'.png" />');
	el.addClass(im)
	state = !state;
	checkGrid();
};

function checkGrid(){
	var blankspace = $('.block').filter(function(){
		return ! ($(this).hasClass('x') || $(this).hasClass('o'))
	})
	if(blankspace.length == 0)
		gameOver();
}

function gameOver(){
	setTimeout(function(){
		if(confirm('Game over. Start new game ?')){
			$('.block').map(function(){
				$(this).empty();
				$(this).removeClass('x')
				$(this).removeClass('o')
			})
			$('#newgame').show();
			$('.game').hide();
		}
	},300)
}

function startGame(){
	state = true;
	$('.game > div > div').click(function(){
		$(this).unbind('click');
		strike($(this));
	})
}