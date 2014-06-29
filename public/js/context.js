/*create highliting of each content part that rendered on display*/



/*!
 * jquery.scrollto.js 0.0.1 - https://github.com/yckart/jquery.scrollto.js
 * Scroll smooth to any element in your DOM.
 *
 * Copyright (c) 2012 Yannick Albert (http://yckart.com)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 * 2013/02/17
 **/
$.scrollTo = $.fn.scrollTo = function(x, y, options){
    if (!(this instanceof $)) return $.fn.scrollTo.apply($('html, body'), arguments);

    options = $.extend({}, {
        gap: {
            x: 0,
            y: 0
        },
        animation: {
            easing: 'swing',
            duration: 250,
            complete: $.noop,
            step: $.noop
        }
    }, options);

    return this.each(function(){
        var elem = $(this);
        elem.stop().animate({
            scrollLeft: !isNaN(Number(x)) ? x : $(y).offset().left + options.gap.x,
            scrollTop: !isNaN(Number(y)) ? y : $(y).offset().top - $(".header").height() + options.gap.y
        }, options.animation);
    });
};

var set_smooth_scrolling = function() {

    /** 
     * This part does the "fixed navigation after scroll" functionality
     * We use the jQuery function scroll() to recalculate our variables as the 
     * page is scrolled/
    */
	var stickyNavTop = $('.header').offset().top;
	var stickyNav = function() {  
		var scrollTop = $(window).scrollTop();

		if (scrollTop > stickyNavTop) {   
		    $('.header').addClass('sticky');  
		} else {  
		    $('.header').removeClass('sticky');   
		}  
	};
	stickyNav();
    
    /**
     * This part causes smooth scrolling using scrollto.js
     * We target all a tags inside the nav, and apply the scrollto.js to it.
     */
    $("nav a").click(function(evn){
        evn.preventDefault();
        $('html,body').scrollTo(this.hash, this.hash); 
    });

    /**
     * This part handles the highlighting functionality.
     * We use the scroll functionality again, some array creation and 
     * manipulation, class adding and class removing, and conditional testing
     */
    var aChildren = $("nav li").children(); // find the a children of the list items
    var aArray = []; // create the empty aArray
    for (var i=0; i < aChildren.length; i++) {    
        var aChild = aChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    } // this for loop fills the aArray with attribute href values

    $(window).scroll(function() {
	
		stickyNav();

	    var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
	    var windowHeight = $(window).height(); // get the height of the window
	    var docHeight = $(document).height();
	 
	    for (var i=0; i < aArray.length; i++) {
	        var theID = aArray[i];
	        var divPos = $(theID).offset().top; // get the offset of the div from the top of page
	        var divHeight = $(theID).height(); // get the height of the div in question
	        if (windowPos + windowHeight/4 >= divPos   &&   
                    windowPos + windowHeight/4 < (divPos + divHeight)) {
	            $("a[href='" + theID + "']").addClass("nav-active");
                $(theID).addClass("content-item-active");
	        } else {
	            $("a[href='" + theID + "']").removeClass("nav-active");
                $(theID).removeClass("content-item-active");
	        }
	    }
	    if(windowPos + windowHeight == docHeight) {
	        if (!$("nav li:last-child a").hasClass("nav-active")) {
	            var navActiveCurrent = $(".nav-active").attr("href");
	            $("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
	            $("nav li:last-child a").addClass("nav-active");
                $(navActiveCurrent).removeClass("content-item-active");
                $(".content-item:last-child").addClass("content-item-active");
	        }
	    }
	});
}

$(document).ready(set_smooth_scrolling);  
$(window).resize(set_smooth_scrolling);