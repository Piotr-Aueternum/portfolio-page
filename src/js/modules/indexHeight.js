if (window.matchMedia("(max-width: 1160px)").matches) {
	var headerHeight = $('header').height();
	var windowHeight = window.innerHeight - headerHeight;
	$('.sectionBackground--big').css('height', windowHeight);
}