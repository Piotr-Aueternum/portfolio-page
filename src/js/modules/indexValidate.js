//=require ../lib/jquery.validate.min.js
$("#newsletter").validate({
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

    	if($('#newsletter .select.error, #newsletter .input.error').length) {
    		if(!$('.newsletter__errors').hasClass('is-active')) {
				$('.newsletter__errors').removeClass('is-active');
	    	}
    	}

    },
    unhighlight: function(element, errorClass) {

    	$(element).removeClass(errorClass);

    	if(!$('#newsletter .select.error, #newsletter .input.error').length) {
    		if($('.newsletter__errors').hasClass('is-active')) {
				$('.newsletter__errors').removeClass('is-active');
	    	}
    	}

    },
    invalidHandler: function() {

   		// dodajemy error
		if(!$('.newsletter__errors').hasClass('is-active')) {
			$('.newsletter__errors').addClass('is-active');
		}

    },
	submitHandler: function(form) {
		jQuery.ajax({
			method: "GET",
			url: "/contact_me.php?"+jQuery('#newsletter').serialize()
		});
		$('.newsletter__success').addClass('is-active');
		setTimeout(function() {
			$('#newsletter')[0].reset();
			setTimeout(function () {
				$('.newsletter__success').removeClass('is-active');
			}, 1000);
		}, 4000);
	}
});
$('#newsletter .hide-error').click(function() {
	$('.newsletter__errors').removeClass('is-active');
});


