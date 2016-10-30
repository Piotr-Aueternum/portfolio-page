// //=require ../lib/jquery.waypoints.min.js
// if (window.matchMedia("(min-width: 1160px)").matches) {
// 	var parallaxWaypoint = $('.backgroundImage--fixed').waypoint({
// 	  handler: function(direction) {
// 	  	$(this.element).toggleClass('backgroundImage--scroll');
// 	  },
// 	  offset: '110%'
// 	})
// }

// 			var $windowscroll = $(window);
// 			console.log('test')
// 			$(window).scroll(function(){
// 				var pos = $windowscroll.scrollTop();
// 				var yPos = -(pos * 0.1) - 20; 
// 				var coords = yPos;
// 				$('.backgroundImage--scroll').css('background-position', 'center ' + coords +'px');
// 			});

if (window.matchMedia("(min-width: 1160px)").matches) {
	var $windowscroll = $(window);
	$(window).scroll(function(){
		var pos = $windowscroll.scrollTop();
		if (window.matchMedia("(min-width: 1500px)").matches) {
			var yPos = -(pos * 0.04); 
		} else {
			var yPos = -(pos * 0.08); 
		}
		var coords = yPos;
		$(".backgroundImage--fixed").css('transform', 'translateY(' + coords +'px)');
	});
}