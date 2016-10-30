//=require ../modules/firstLetterCapitalize.js
//=require ../lib/jquery.simpleWeather.min.js

function weather() {
	$.simpleWeather({
		location: 'Gdańsk',
		woeid: '',
		unit: 'c',
		success: function(weather) {
			var DayNameWeather = ["niedziela ", "poniedziałek ", "wtorek ", "środa", "czwartek", "piątek", "sobota"]
			, Today = new Date()
			, WeekDay = Today.getDay()
			, Month = Today.getMonth()
			, Day = Today.getDate()
			, Year = Today.getFullYear()
			, html;
			if(Month < 10) {
				Month = "0" + Month;
			}
			html = "<p>"+weather.city+'. '+DayNameWeather[WeekDay].capitalize()+", "+Day+"."+Month+"</p>";
			html += '<span class="weather icon-'+weather.code+'"></span> '+weather.temp+'&deg;'+weather.units.temp;
			$("#weather").html(html);
		},
		error: function(error) {
			$("#weather").html('<p>'+'Nie udało się pobrać informacji o pogodzie, <br> za 5 sekund zostaną pobrane ponownie, <br> proszę czekać.'+'</p>');
			setTimeout(function() {
				weather()
				console.log('test')
			}, 5000);
		}
	});
}
weather();