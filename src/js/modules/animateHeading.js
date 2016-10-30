//=require ../lib/jquery.waypoints.min.js
//=include ../lib/iOSDetect.js
if(!iOS()) {
	var waypoints = $('.anim-slideInUp').waypoint(function(direction) {
		$(this.element).addClass('is-active');
	}, {
		offset: '80%'
	});
} else {
	$('.anim-slideInUp').addClass('is-active');
}