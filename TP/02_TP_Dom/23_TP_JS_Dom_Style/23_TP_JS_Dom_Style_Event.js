/* 
 AfpaCréteil CDI
 DB 2015
23_TP_JS_Dom_Style_This.js
 */
function press(ev)
{
    if(ev.target)
        var baliseImg = ev.target;
    else
        var baliseImg = ev.srcElement;// sous IE ev.srcElement
    baliseImg.src = "images/shadow-proof.jpg";
    baliseDiv = document.getElementById("idDivPreuve");
    baliseDiv.style.display = "block";
}

function depress(ev)
{
    if(ev.target)
        var baliseImg = ev.target;
    else
        var baliseImg = ev.srcElement;// sous IE ev.srcElement
    baliseImg.src = "images/shadow-illusion.jpg";
    document.getElementById("idDivPreuve").style.display = "none";
}



