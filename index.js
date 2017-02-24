(function( $ ){

	let state = true;

	$.fn.strike = function(el) {
	  var im = state ? 'x':'o';
	  $(this).prepend('<img src="../images/'+im+'.png" />');
	  $(this).addClass(im)
	  state = !state;
	  return this;
	}; 

})( jQuery );


$(document).ready(function(){

	$('.grid3x3 > div > div').click(function(){
		$(this).strike();
	})
})