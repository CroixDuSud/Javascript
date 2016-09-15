// Document JavaScript : 24_TP_JS_Dom_Date_FR_EN.js
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
var tabMois = [];
tabMois["FR"] = Array("Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre");
tabMois["EN"] = Array("January","February","March","April","May","June","July","Agust","September","October","November","December");
// récupération de la langue du navigateur
var langage = navigator.language;   // attention on peut avoir fr-fr
var langue = (langage.indexOf('fr') > -1)?"FR":"EN";
internationnaliser(langue);

// récupération du noeud du Select des jours pour créer les options
// déclaration et initialisation d'une variable locale noeudSelect qui sera utilisée
// 		pour les 3 balise select à initialiser
var noeudSelect = document.getElementById("idCbxJour");
// boucle créant les différentes options du select
for (var i=1; i<=31; i++) {
// création d'un noeud Option
/*
	// première solution :
	var noeudOption = document.createElement('option'); // créer un noeud Option
 	var noeudText = document.createTextNode(i);// créer un noeud text
	noeudOption.appendChild(noeudText); // ajout du noeud Text au noeud Option
	// modification de l'attribut value du noeud
	noeudOption.setAttribute('value', i);
	// ajout du noeud Option au noeud Select
	noeudSelect.appendChild(noeudOption);
*/	
/*
	// deuxième solution :
	var noeudOption = new Option(); // appel du constructeur par defaut new Option()
	// Modification du noeud text
	noeudOption.text = i;
	// modification de l'attribut value du noeud
	noeudOption.value = i;
	// ajout du noeud Option au noeud Select
	noeudSelect.add(noeudOption);
*/

	// troisième solution :
	var noeudOption = new Option(i, i, false, false); // appel du constructeur new Option([text], [value], [defaultSelected], [selected])
	// ajout du noeud Option au noeud Select
	noeudSelect.add(noeudOption);

}

// récupération du noeud du Select des mois pour créer les options
noeudSelect = document.getElementById("idCbxMois");
for (var i=0; i<12; i++) {
	var opt = new Option(tabMois[langue][i], i+1, false, false);
//	var opt = new Option();	// création d'un objet 'noeud Option'
// ajout 

//	opt.innerHTML=tabMois[i];	// 
//	opt.value = i+1;
	noeudSelect.options.add(opt);
}
// ajout du gestionnaire d'évènement (change) majSelectJour sur la balise select mois
addEvent(noeudSelect, 'change', majSelectJour, false);


// récupération du noeud du Select des jours pour créer les options
noeudSelect = document.getElementById("idCbxAnnee");
for (var i=1900; i<=dateDuJour.getFullYear(); i++) {
	var opt = new Option(i, i, false, false);
	noeudSelect.options.add(opt);
}
// ajout du gestionnaire d'évènement (change) majSelectJour sur la balise select année
addEvent(noeudSelect, 'change', majSelectJour, false);

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
		if(((diffMois==0 && diffJour>0) || diffMois > 0) && nbrAnnee >0) nbrAnnee--;
		alert("Vous avez : " + nbrAnnee + " ans");	
	}
}

function majSelectJour() {
	// en fonction de la saisie effectuée, il nous faut connaitre le nombre de jours du mois
	// ceci est fait en créant un objet date en passant au constructeur l'année, le mois et
	// 		en mettant le paramètre jour à 0
	// 		reste à invoquer la méthode getDate() qui renvoi le nombre de jours du mois
	var dateSelect = new Date(document.getElementById("idCbxAnnee").value, document.getElementById("idCbxMois").selectedIndex+1, 0);
	var nbrJourDuMois = dateSelect.getDate();
	// recherche de la balise select des jours
	var baliseSelect = document.getElementById("idCbxJour");
	// récupération du nombre d'options qu'elle contient : propriété length
	var nbrOption = baliseSelect.length;
	// suppression de tous les objets options en trop (du 29 au 30 ou 31)
	while(nbrOption != 28){
		baliseSelect.remove(nbrOption - 1);
		nbrOption--;
	}
	// recréation des éléments manquant
	for(var i=nbrOption+1; i<=nbrJourDuMois; i++){
		var opt=new Option(i, i, false, false);
		baliseSelect.add(opt);
	}
}

function internationnaliser(langue){
    var tabLabel = [];
    tabLabel["FR"] = {legend0:"Entrez votre date de naissance",
                      legend1:"Sélectionnez l'unité",
                      label0:"année ",
                      label1:"mois ",
                      label2:"jour ",
                      label3:" nombre de jours",
                      label4:" nombre de mois",
                      label5:" nombre d'année",
                      button:"Calculer",
                  };
    tabLabel["EN"] = {legend0:"Enter your date of birth",
                      legend1:"Select unit",
                      label0:"year ",
                      label1:"month ",
                      label2:"day ",
                      label3:" number of day",
                      label4:" number of month",
                      label5:" number of year",
                      button:"Calculate",
                  };
                  
    var listLegend = document.forms[0].querySelectorAll("legend");
    listLegend[0].textContent = tabLabel[langue]['legend0'];
    listLegend[1].textContent = tabLabel[langue]['legend1'];
    
    var listLabel = document.forms[0].querySelectorAll("label");
    listLabel[0].textContent = tabLabel[langue]['label0'];
    listLabel[1].textContent = tabLabel[langue]['label1'];
    listLabel[2].textContent = tabLabel[langue]['label2'];
    listLabel[3].textContent = tabLabel[langue]['label3'];
    listLabel[4].textContent = tabLabel[langue]['label4'];
    listLabel[5].textContent = tabLabel[langue]['label5'];

    var button = document.forms[0].querySelector("#idBtnCalcul");
    button.value = tabLabel[langue]['button'];

}

addEvent( window, 'load', initWindow, false);
