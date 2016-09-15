// Document JavaScript : 24_TP_JS_Dom_Date_2.js
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
// 		sert à initialiser les objets (select) de la page html
function initWindow() {
// appel du constructeur Array(...) pour la création du tableau
var tabMois = Array("Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre");

// récupération du noeud du Select des mois pour créer les options
noeudSelect = document.getElementById("idCbxMois"); 
for (var i=0; i<12; i++) {
// création d'un noeud Option

	// première solution :
/*	var noeudOption = document.createElement('option'); // créer un noeud Option
 	var noeudText = document.createTextNode(tabMois[i]);// créer un noeud text
	noeudOption.appendChild(noeudText); // ajout du noeud Text au noeud Option
	// modification de l'attribut value du noeud
	noeudOption.setAttribute('value', i+1);
	// ajout du noeud Option au noeud Select
	noeudSelect.appendChild(noeudOption);
	
*/
	// deuxième solution :
/*	var noeudOption = new Option(); // appel du constructeur par defaut new Option()
	// Modification du noeud text
	noeudOption.text = tabMois[i];
	// modification de l'attribut value du noeud
	noeudOption.value = i+1;
	// ajout du noeud Option au noeud Select
	noeudSelect.add(noeudOption);
*/

	// troisième solution :
	var opt = new Option(tabMois[i], i+1, false, false);
	noeudSelect.options.add(opt);
        
}

// récupération du noeud du Select des années pour créer les options
noeudSelect = document.getElementById("idCbxAnnee");
for (var i=1900; i<=dateDuJour.getFullYear(); i++) {
	var opt = new Option(i, i, false, false);
	noeudSelect.options.add(opt);
}

// ajout du gestionnaire d'évènement (click) calculer sur le bouton de calcul
addEvent(document.getElementById("idBtnCalcul"), 'click', calculer, false);

}  // fin initWindow

// fonction calculer()
// 		sert à calculer et à afficher les résultats
function calculer() {
	// calcul du nombre d'années séparant l'année  en cours (appel de la méthode
	// 	 getFullYear() sur la variable globale dateDuJour) de l'année sélectionée
	//	 dans la liste déroulante select (document.getElementById("idCbxAnnee").value)
	var nbrAnnee = dateDuJour.getFullYear() - document.getElementById("idCbxAnnee").value;
	//	calcul de la différence de mois séparant le mois actuel du mois saisi
	//  attention : getMonth() renvoi une valeur de 0 à 11, selectedIndex aussi
	//              le calcul est donc bon
	var diffMois = document.getElementById("idCbxMois").selectedIndex - dateDuJour.getMonth();
	// si vous utilisez la propriété value sur une objet select, c'est la propriété
	// 		value de son objet fils option sélectionné qui est renvoyée
	// 		pour moi la valeur va de 1 à 12 d'où un calcul erroné
//	var diffMois = document.getElementById("idCbxMois").value - dateDuJour.getMonth();
	//	calcul de la différence de jours séparant le jours actuel du jours saisi
	var diffJour = document.getElementById("idCbxJour").value - dateDuJour.getDate();
	//	création d'un nouvel objet dateSaisie de type Date (appel au constructeur
	//  	Date(annee, mois, jour) en récuparant les données des différents select
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
		if(((diffMois===0 && diffJour>0) || diffMois > 0) && nbrAnnee >0) nbrAnnee--;
		alert("Vous avez : " + nbrAnnee + " ans");	
	}
}

addEvent( window, 'load', initWindow, false);
