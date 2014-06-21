var set_sticky = function() {

	var stickyNavTop = $('.header').offset().top;
	var stickyNav = function(){  
		var scrollTop = $(window).scrollTop();

		if (scrollTop > stickyNavTop) {   
		    $('.header').addClass('sticky');  
		} else {  
		    $('.header').removeClass('sticky');   
		}  
	};  
	stickyNav();  
	$(window).scroll(function() {  
	    stickyNav();  
	});  
}

$(document).ready(set_sticky);  
$(window).resize(set_sticky);