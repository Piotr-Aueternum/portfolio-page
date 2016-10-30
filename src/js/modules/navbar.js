//=require ../lib/jquery.waypoints.min.js
$('.navbar__toggle').on('click', function() {
	var $btn = $(this);
	var $menu = $(this).parent();
	var openedClass = 'is-active';
	$btn.toggleClass(openedClass);
	$menu.toggleClass(openedClass);
	$('body').toggleClass('no-scroll');
	setTimeout(function () {
		$(document).on('click', function (e) {
			if(!$btn[0].contains(e.target))  {
				$menu.removeClass(openedClass);
				$btn.removeClass(openedClass);
				$('body').removeClass('no-scroll');
			}
		});
	}, 100);
});
if (window.matchMedia("(min-width: 1160px)").matches) {
	var waypoint = new Waypoint({
	  element: $('body'),
	  handler: function(direction) {
	    $('.header').toggleClass('header--compact');
	  },
	  offset: '-25%'
	})
}
