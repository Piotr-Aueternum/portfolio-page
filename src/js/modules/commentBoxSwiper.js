//=require ../lib/swiper.jquery.min.js
commentBoxSlider = new Swiper('#commentBoxSlider', {
	speed: 1000,
	autoplay: 3000,
	loop: true,
	slidesPerView: 1,
	pagination: '.swiper-pagination',
	paginationClickable: true,
	spaceBetween: 20
});