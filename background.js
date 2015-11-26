
// Une regexp à retravailler, plus précise que celle du manifest.json
// var urlRegex = /^.*laposte.*/;

/* Si on en vient à faire un truc un peu plus complexe, 
qui automatise les 3 pages et/ou permet que tu lui
passe d'un coup plusieurs personnes
*/
function next(success) {
	if ( success === "done" ){
	}
}

// Quand le bouton est cliqué
chrome.browserAction.onClicked.addListener(function(tab) {
    // checke l'URL
    // if (urlRegex.test(tab.url)) {
    	// déclenche la saisie des données et le remplissage du formulaire
        chrome.tabs.sendMessage(tab.id, { text: "fill_form" }, next);
    // }
});