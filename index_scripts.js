
	//PARALLAX IS INTERFERING WITH THE SMOOTH SCROLLING

	//parallax for jumbotron
	/*var jumboHeight = $('.jumbotron').outerHeight();
	$(window).scroll(function(e){
		parallax();
	});

	function parallax(){
		var scrolled=$(window).scrollTop();
		$('.jumbotron').css('height', (jumboHeight-scrolled) + 'px');
	}*/

	//smooth scrolling on page
	$(function(){
		$('#menu a').click(function(e){
			e.preventDefault();
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				console.log(this.hash);
				console.log(target);
				//target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if(target.length){
					$('html, body').animate({
						scrollTop: target.offset().top}, 950);
					return false;
				}
			}
		})
	});



	/*
		Clipboard Copy function
	*/
	$(document).ready(function(){
		var clipboard = $('#clipboardcopy');
		clipboard.on('click', function(e){
			clipboard.text('Copied!');
			e.preventDefault();
			clipboard.clipboard({
				path: 'resources/jquery.clipboard.swf',
				copy: function(){
					clipboard.text('...');
            		return 'esl89@cornell.edu';
				}
			});
		});

		
	});
