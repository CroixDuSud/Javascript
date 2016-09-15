/* 
 AfpaCréteil CDI
 DB 2015
23_TP_JS_Dom_Style_Dom2.js
 */
var divPreuve;

function addEvent(emt, evt, fnc, bbl)
{
    if ('attachEvent' in emt)
    //if (emt.attachEvent)
        emt.attachEvent('on' + evt, fnc); //4 MSIE
    else if ('addEventListener' in emt) {
        emt.addEventListener(evt, fnc, bbl); //4 ECMA ex: MFF
    }
}

function initWindow() {

    var image = document.getElementById("idImage");
    image.src = "images/shadow-illusion.jpg";
    //imgIllusion = new Image();
    //imgIllusion.src = image.src;
    //imgPreuve = new Image();
    //imgPreuve.src = "images/shadoimw-proof.jpg"
    
    divPreuve = document.getElementById("idDivPreuve");
    divPreuve.style.display = "none";
    
    addEvent(image, "mousedown", gestIllusion, false);
    addEvent(image, "mouseup", gestIllusion, false);

}

function gestIllusion(event) {

    //var cheminImage = image.getAttribute("src");
    //var cheminImage = image.src;
    //alert(cheminImage);

    if (event.type == 'mousedown') {
        var image = event.target || event.srcElement;
        image.src = "images/shadow-proof.jpg";
        //event.target.src = "images/shadow-proof.jpg";
        //event.srcElement.src = "images/shadow-proof.jpg";
        //this.src = "images/shadow-proof.jpg";
        //image.src = imgPreuve.src;
        divPreuve.style.display = "block";
    } else {
        //event.target.src = "images/shadow-illusion.jpg";
        this.src = "images/shadow-illusion.jpg";
        //image.src = imgIllusion.src;
        divPreuve.style.display = "none";

    }
}

addEvent(window, 'load', initWindow, false);