//=require ../lib/jquery.validate.min.js
$("#form").validate({
	ignore: ".ignore",
	rules: {
		email: {
			required: true
		}
	},
	errorPlacement: function(error, element) {
		return;
	}, 
    highlight: function(element, errorClass) {

    	$(element).addClass(errorClass);

    	if($('#form .select.error, #form .input.error').length) {
    		if(!$('.form__errors').hasClass('is-active')) {
				$('.form__errors').removeClass('is-active');
	    	}
    	}

    },
    unhighlight: function(element, errorClass) {

    	$(element).removeClass(errorClass);

    	if(!$('#form .select.error, #form .input.error').length) {
    		if($('.form__errors').hasClass('is-active')) {
				$('.form__errors').removeClass('is-active');
	    	}
    	}

    },
    invalidHandler: function() {

   		// dodajemy error
		if(!$('.form__errors').hasClass('is-active')) {
			$('.form__errors').addClass('is-active');
		}

    },
	submitHandler: function(form) {
		$.ajax({
			method: "GET",
			url: "/contact_me.php?"+$('#form').serialize()
		});
		$('.form__success').addClass('is-active');
		setTimeout(function() {
			$('#form')[0].reset();
			setTimeout(function () {
				$('.form__success').removeClass('is-active');
			}, 1000);
		}, 4000);
	}
});
$('#form .hide-error').click(function() {
	$('.form__errors').removeClass('is-active');
});


