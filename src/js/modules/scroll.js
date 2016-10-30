//=require ../lib/scroller.dev.js
var OSName;
if (window.navigator.userAgent.indexOf("Windows") != -1) OSName="Windows";
if(OSName != "Windows") {
	if (window.matchMedia("(min-width: 1160px)").matches) {
		if (!(navigator.userAgent.toLowerCase().indexOf('firefox') > -1)){
			window.dzsscr_init($('body'),{
				'type':'scrollTop'
				,'settings_skin':'skin_apple'
				,enable_easing: 'on'
				,settings_autoresizescrollbar: 'on'
				,settings_chrome_multiplier : 0.04
			})
		}
	}
}