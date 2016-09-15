// Document JavaScript : 24_TP_JS_Dom_Date_1.js
// date de création : janvier 2016
// auteur : DB Afpa

// déclaration et initialisation d'une variable globale dateDuJour
// initialisation à la valeur de la date courante (système) par appel au constructeur
//		d'un objet Date
var dateDuJour = new Date();

// fonction permettant d'ajouter un écouteur d'évènement à un objet du DOM
// 		1er paramètre  : l'objet qui reçoit le gestionnaire
//		2ème paramètre : le type d'évènement (click, change, ...)
//		3ème paramètre : la fonction JS qui sert de gestionnaire
//		4ème paramètre : un bouleen autorisant ou non la capture
function addEvent( emt, evt, fnc, bbl)
{
    if( 'attachEvent' in emt) emt.attachEvent( 'on' + evt, fnc); //pour MS IE
    else if( 'addEventListener' in emt){
        emt.addEventListener( evt, fnc, bbl); //pour ECMA ex: FireFox
    }
}

// gestionnaire d'évènement associé à l'objet window
// 	sert à initialiser les objets (select) de la page html
function initWindow() {
    
// ajout du gestionnaire d'évènement (click) calculer sur le bouton de calcul
addEvent(document.getElementById("idBtnCalcul"), 'click', calculer, false);

}  // fin initWindow

// fonction calculer()
// 	sert à calculer et à afficher les résultats
function calculer() {
	// calcul du nombre d'années séparant l'année  en cours (appel de la méthode
	// 	 getFullYear() sur la variable globale dateDuJour) de l'année sélectionée
	//	 dans l'input type="text" (document.getElementById("idCbxAnnee").value)
	var nbrAnnee = dateDuJour.getFullYear() - document.getElementById("idCbxAnnee").value;

	// calcul de la différence de mois séparant le mois actuel du mois saisi
	//      attention : getMonth() renvoi une valeur de 0 à 11, il faut donc retrancher 1
        //      de la valeur sélectionnée
	var diffMois = document.getElementById("idCbxMois").value - dateDuJour.getMonth()-1;
        
	// calcul de la différence de jours séparant le jours actuel du jours saisi
	var diffJour = document.getElementById("idCbxJour").value - dateDuJour.getDate();

	// création d'un nouvel objet dateSaisie de type Date (appel au constructeur
	// Date(annee, mois, jour) en récuparant les données des différents inputs
	var dateSaisie = new Date(document.getElementById("idCbxAnnee").value, document.getElementById("idCbxMois").value-1, document.getElementById("idCbxJour").value);
	
	// calcul du résultat en fonction des boutons radio jour, mois, année
	// test de la propriété checked sur les objets input type radio
	if (document.getElementById("idOptJour").checked) {
            // calcul du nombre de jours séparant la date actuelle avec la date calculée
            // utilisation de getTime() qui renvoi un certain nombre de milisecondes
            // on fait la différence et on divise par 1000/60/60/24 pour convertir en jour
            var nbrJour = (dateDuJour.getTime() - dateSaisie.getTime())/1000/60/60/24;
            nbrJour = Math.ceil(nbrJour);	// arrondi
            alert("Vous avez : " + nbrJour + " jours");			//affichage
	}
	else if(document.getElementById("idOptMois").checked) {
            // calcul du nombre de mois séparant la date actuelle avec la date calculée
            // utilisation des variable nbrAnnée et diffMois
            var nbrMois = nbrAnnee * 12 - diffMois;
            alert("Vous avez : " + nbrMois + " mois");
	} else {
            // calcul du nombre d'années séparant la date actuelle avec la date calculée
            // le calcul dépend de diffMois, diffJour
            if(((diffMois===0 && diffJour>=0) || diffMois > 0) && nbrAnnee >0) nbrAnnee--;
            alert("Vous avez : " + nbrAnnee + " ans");	
	}
}

addEvent( window, 'load', initWindow, false);
