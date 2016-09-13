function press()
{
	var baliseDiv = document.getElementById("idDivImage");
	var baliseImg = document.getElementById("idImage");
	baliseImg.setAttribute("src", "images/shadow-proof.jpg");
	var preuve = document.getElementById("idDivPreuve");
	preuve.style.display = "initial";

}

function depress()
{
	var baliseDiv = document.getElementById("idDivImage");
	var baliseImg = document.getElementById("idImage");
	baliseImg.setAttribute("src", "images/shadow-illusion.jpg");
	var preuve = document.getElementById("idDivPreuve");
	preuve.style.display = "none";
}

