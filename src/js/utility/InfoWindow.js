import $ from 'jquery';

export function showFetchError(error) {
	let status = error.split(' ')[0];
	let errorMessage = '';
	
	switch(status) {
		case '404':
			errorMessage = 'pyytämääsi resurssia ei löytynyt.';
			break;
		case '401':
			errorMessage = 'puutteelliset käyttöoikeudet.';
			break;
	}
	
	//alert('Haku epäonnistui, ' + errorMessage);
	
	
	$('#container').append("<div class='info' style='position:fixed;width:300px;height:100px;background:black;left:40%;color:white;cursor:pointer;'><p>Haku epäonnistui, " + errorMessage + "</p></div>");
	$(document).on('click', '.info', () => {
		$('.info').hide();
	});
}


