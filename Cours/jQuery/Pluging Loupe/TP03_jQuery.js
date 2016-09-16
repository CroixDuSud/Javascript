// variables
var canvas, ctxCanvas;
var image;
var iMouseX, iMouseY = 1;
var bMouseDown = false;
var iZoomRadius = 100;
var iZoomPower = 4;

// drawing functions
function clear() { // clear canvas function
    ctxCanvas.clearRect(0, 0, ctxCanvas.canvas.width, ctxCanvas.canvas.height);
}

// fonction principale appelée toutes les 30ms
function drawScene() {
 
    if (bMouseDown) { // drawing zoom area
        clear(); // clear canvas
//        ctxCanvas.drawImage(image, 0 - iMouseX * (iZoomPower - 1), 0 - iMouseY * (iZoomPower - 1), ctxCanvas.canvas.width * iZoomPower, ctxCanvas.canvas.height * iZoomPower);
        ctxCanvas.drawImage(image, iMouseX * (1-iZoomPower), iMouseY * (1-iZoomPower), ctxCanvas.canvas.width * iZoomPower, ctxCanvas.canvas.height * iZoomPower);
        ctxCanvas.globalCompositeOperation = 'destination-atop';

         ctxCanvas.beginPath();
        ctxCanvas.arc(iMouseX, iMouseY, iZoomRadius, 0, Math.PI*2, true); 
        ctxCanvas.closePath();
        ctxCanvas.fill();
        ctxCanvas.drawImage(image, 0, 0, ctxCanvas.canvas.width, ctxCanvas.canvas.height);
    }

}

// fonction d'initialisation du jQuery $(document).ready()
$(function(){
    // récupération de l'objet canvas 
    canvas = document.getElementById('image');
    ctxCanvas = canvas.getContext('2d');
	
    // chargement de l'image source
    image = new Image();        // = $(new Image());
    image.onload = function () {    // image.on("load", function(){});
        ctxCanvas.drawImage(image, 0, 0, ctxCanvas.canvas.width, ctxCanvas.canvas.height);
       // ctxCanvas.drawImage(image.get(), 0, 0, ctxCanvas.canvas.width, ctxCanvas.canvas.height);
       // image.get() transforme un objet jQuery en objet DOM
    }
    image.src = '../Images/img01.jpg';     // image.attr("src", 'url("../Images/img01.jpg")');

    // ajout du gestionnaire d'évènement mousemouve sur la balise canvas
    $('#image').mousemove(function(evt) {
        var canvasOffset = $(canvas).offset();  // récupération de l'offset de l'objet DOM transformé en objet jQuery'
        iMouseX = Math.floor(evt.pageX - canvasOffset.left);
        iMouseY = Math.floor(evt.pageY - canvasOffset.top);
    });

// ajout du gestionnaire d'évènement mousedown sur la balise canvas
    $('#image').mousedown(function(e) {
        bMouseDown = true;
    });

// ajout du gestionnaire d'évènement mouseup sur la balise canvas
    $('#image').mouseup(function(e) {
        bMouseDown = false;
        clear(); // efface le canvas pour réafficher l'image seule'
        ctxCanvas.drawImage(image, 0, 0, ctxCanvas.canvas.width, ctxCanvas.canvas.height);
    });

    setInterval(drawScene, 30); // appel toutes les 30ms de la fonction drawScene
});