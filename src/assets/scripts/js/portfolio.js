function scrollTo(event) {
	if (event != 0) {

		var appElement = document.querySelector('[ng-app=portfolioApp]');
		var elem = event.target.getAttribute('href');

		var $anchor = $(appElement).find(elem);
		$('html, body').stop().animate({
			scrollTop: ($anchor.offset().top - 50)
		}, 1250, 'easeInOutExpo');
		event.preventDefault();
	}
}

(function ($) {
	"use strict"; // Start of use strict
	// jQuery for page scrolling feature - requires jQuery Easing plugin

	// Highlight the top nav as scrolling occurs
	$('body').scrollspy({
		target: '.navbar-fixed-top',
		offset: 51
	});

	// Closes the Responsive Menu on Menu Item Click
	$('.navbar-collapse ul li a').click(function () {
		$('.navbar-toggle:visible').click();
	});

})(jQuery); // End of use strict
