
function parse(data){

	function getParam(param){ 
		return data.split(param)[1].split('\n')[1]
	}

	function splitAtFirst(param){
		var first = param.split(' ')[0] ;
		return [
			first,
			param.substring(first.length+1)
		]
	}

	var infos = {} ;

	infos.email = getParam('customers_email_address') ;

	var fullName = getParam('delivery_name') ;
	infos.firstName = splitAtFirst(fullName)[0] ;
	infos.lastName = splitAtFirst(fullName)[1] ;

	var fullAddress = getParam('delivery_street_address') ;
	infos.addressNumber = splitAtFirst(fullAddress)[0] ;
	infos.addressStreet = splitAtFirst(fullAddress)[1] ;

	infos.city = getParam('delivery_city') ;

	infos.zipCode = getParam('delivery_postcode') ;

	return infos
}

function guessGender(firstname, callback){
	$.get( "https://api.genderize.io/?name="+firstname, function( data ) {
		  callback(data.gender === 'male' ? 'mr' : 'mme');
	}).fail(function(){
		callback('mr');
	})
}

// todo verif infos complètes et valides (max length, mr/mme, ville...)
function formatInfos(infos){

	var maxLengths = {
		'lastName' : 20,
		'firstName' : 15,
		'addressNumber' : 8,
		'addressStreet' : 27,
		'zipCode' : 9
	} ;
	var reformated = [] ;

	for (var param in maxLengths){
		if ( infos[param].length > maxLengths[param] ){
			infos[param] = infos[param].substring(0, maxLengths[param]) ;
			reformated.push(param) ;
		}
	} ;

	return {
		result : infos,
		reformated : reformated
	}
}

function updateValues(infos){

	$('#recipientCivility').val(infos.civility) ;
	$('#recipientName').val(infos.lastName) ;
	$('#recipientFirstName').val(infos.firstName) ;
	$('#recipientAddress2Number').val(infos.addressNumber) ;
	$('#recipientAddress2Street').val(infos.addressStreet) ;
	$('#receiverZipCode').val(infos.zipCode) ;
	//$('#destVilleCityComboID').val(infos.city)
	$('#recipientMail').val(infos.email) ;
	$('#recipientConfirmMail').val(infos.email) ;
	// $('#addAddress').attr('checked',true) ;
	// $('#useInfo').attr('checked',true) ;

}

var header = 
"autoPoste v0.4"

// déclenche la saisie des données et le remplissage du formulaire
function autoPoste(){
    	// Fenetre pour demander la data brute
	var data = window.prompt(header) ;

	// Si qqchose a été rentré
	if (data){
		// try / catch essentiellement pour du JSON malformé à priori
	    try{
			var infos = parse(data); // JSON.parse(data);
			var format = formatInfos(infos) ;
			infos = format.result ;
			if (format.reformated){
				alert('Formats non conformes (trop longs ?) : '+format.reformated) ;
			}
			guessGender(infos.firstName, function(gender){
				infos.civility = gender ;
				updateValues(infos);
				$.scrollTo($('#recipientId')) ;
			}) ;
	    }catch(e){
	        alert(e);
	    }
	}
}


// var urlRegex = /^.*laposte.*/;
// if (urlRegex.test(document.location)) {
	// ajoute un raccourci clavier
	$(document).bind('keydown', 'ctrl+space', autoPoste);
// }


// ecoute les messages envoyés par le background
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    // si le message est de remplir le formulaire (le background a détécté un clique sur le couton)
    if (msg.text && (msg.text === "fill_form")) {
    	autoPoste() ;
    }
});
