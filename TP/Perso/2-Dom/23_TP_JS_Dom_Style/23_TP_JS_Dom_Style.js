function press()
{
	var baliseImg = document.getElementById("idImage");
	baliseImg.setAttribute("src", "images/shadow-proof.jpg");
	var preuve = document.getElementById("idDivPreuve");
	preuve.style.display = "initial";

	/*=========== Autre méthode ==============
	baliseImg.src = "images/shadow-proof.jpg";
	========================================*/
}

function depress()
{
	var baliseImg = document.getElementById("idImage");
	baliseImg.setAttribute("src", "images/shadow-illusion.jpg");
	var preuve = document.getElementById("idDivPreuve");
	preuve.style.display = "none";
}

