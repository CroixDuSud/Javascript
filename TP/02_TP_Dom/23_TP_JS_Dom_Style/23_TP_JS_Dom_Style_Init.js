/* 
 AfpaCréteil CDI
 DB 2015
23_TP_JS_Dom_Style_Init.js
 */
function press()
{
    baliseImg = document.getElementById("idImage");
    baliseImg.src = "images/shadow-proof.jpg";
    baliseDiv = document.getElementById("idDivPreuve");
    baliseDiv.style.display = "block";
}

function depress()
{
    document.getElementById("idImage").src = "images/shadow-illusion.jpg";
    document.getElementById("idDivPreuve").style.display = "none";
}

function init() {
    document.getElementById("idImage").src = "images/shadow-illusion.jpg";
    document.getElementById("idDivPreuve").style.display = "none";
}



