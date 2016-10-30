var nav = {
	nav: function() {
		var navbar = $('.nav');
		return navbar;
	},
	toggle: function() {
		var toggle = $(this.nav).find('.nav__toggle');
		return toggle;
	},
	list: function() {
		var list = $(this.nav).find('.nav__list');
		return list;
	},
	init: function() {
		var _this = this;
		this.toggle().on('click', function() {
			_this.list().toggleClass('active');
			$(this).toggleClass('active')
		})
	}
}
nav.init()