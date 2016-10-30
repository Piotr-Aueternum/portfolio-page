//=require ../lib/js.cookie.js
// Cookies
var cookies = {
	$cookies: $('<div class="bar bar--cookies"><div class="container"><div class="cookies__text"></div> <div class="button button--alt cookies__close"><span>close&nbsp;</span><span>x</span></div></div></div>'),
	init: function() {
		this.$close = this.$cookies.find('.cookies__close');
		this.$close.click(function() {
			this.createCookie();
			this.$cookies.removeClass('is-active');
		}.bind(this));
		var cookiesAlertShown = this.readCookie();
		if(!cookiesAlertShown) {
			// Check language - default is english
			var $text = cookies.$cookies.find('.cookies__text');
			$text.html('We use cookies to provide you with a better service. Carry on browsing if you\'re happy with this, or find out how to manage <a href="cookies">cookies</a>.');
			var lang = $('html').attr('lang');
			if(lang === 'en') {
				$text.html('We use cookies to provide you with a better service. Carry on browsing if you\'re happy with this, or find out how to manage <a href="cookies">cookies</a>.')
			} else if(lang === 'pl') {
				$text.html('We use cookies to provide you with a better service. Carry on browsing if you\'re happy with this, or find out how to manage <a href="cookies">cookies</a>.')
			}
			this.append();
		}
	},
	append: function() {
		$('body').append(this.$cookies);
		setTimeout(function() {
			this.$cookies.addClass('is-active');
		}.bind(this), 2000);
	},
	createCookie: function() {
		Cookies.set('cookiesAlertShown', true, { expires: 7, path: '/' });
	},
	readCookie: function() {
		return Cookies.get('cookiesAlertShown');
	}
}
cookies.init();
