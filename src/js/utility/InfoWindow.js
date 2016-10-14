import $ from 'jquery';

export function notify(message) {
	if($('.info').length) {
		if(!$('.info').is(":visible")) {
			$('.info').toggle();
		}
		$('.info p:first').text(message);
	}
	else {
		appendInfoWindow(message);
	}
	hideInfoWindow();
}

function appendInfoWindow(message) {
	$('#container').append("<div class='info'><p>" + message + "</p></div>");
	$(document).on('click', '.info', () => {
		$('.info').hide();
	});
}

function hideInfoWindow() {
	setTimeout(() => {
		$('.info').fadeToggle("slow", "linear");
	}, 1500);
}
