/* 
 * Organisation : Afpa DL
 * Auteur : Didier Bonneau
 * Date : 28 août 2013
 */
(function ($)
{
    $.fn.loupe = function (params)
    {
        return this.each(function ()
        {
            // code du plugin
            var iMouseX = 0;
            var iMouseY = 0;
            var bMouseDown = false;
            var parametres = $.extend({
                "srcImage": "",
                "rayonLoupe": 100,
                "zoomLoupe": 4
            }, params);
            
            // limiter le zoom a 10
            parametres.zoomLoupe = Math.min(10, parametres.zoomLoupe);
            // stockage de notre élément en variable
            var elementCanvas = $(this);
            // récupération du context de l'objet jQuery elemntCanvas transformé en objet javascript
            var ctxCanvas = elementCanvas[0].getContext('2d');
 //           var ctxCanvas = elementCanvas.get(0).getContext('2d');
 // 
            // chargement de l'image source
           var image = $(new Image());  // objet jQuery
           // var image = new Image();  // objet javascript
           image.on("load", function(){
           // image.onload = function () {});
               // ctxCanvas.drawImage(image, 0, 0, ctxCanvas.canvas.width, ctxCanvas.canvas.height);
                  ctxCanvas.drawImage(image[0], 0, 0, ctxCanvas.canvas.width, ctxCanvas.canvas.height);
                // image.get(0) ou image[0] transforme un objet jQuery en objet javascript
            });
            // };
            // image.attr("src", 'url("'+parametres.srcImage+'")');
            image[0].src = parametres.srcImage;

            // ajout du gestionnaire d'évènement mousemouve sur la balise canvas
            elementCanvas.mousemove(function(evt) {
                var canvasOffset = elementCanvas.offset();  // r�cup�ration de l'offset de l'objet DOM transform� en objet jQuery'
                 iMouseX = Math.floor(evt.pageX - canvasOffset.left);
                iMouseY = Math.floor(evt.pageY - canvasOffset.top);
                // $("span").text(iMouseX + ", " + iMouseY);
            });

            // ajout du gestionnaire d'évènement mousedown sur la balise canvas
            elementCanvas.mousedown(function(evt) {
                bMouseDown = true;
            });

            // ajout du gestionnaire d'évènement mouseup sur la balise canvas
            elementCanvas.mouseup(function(evt) {
                bMouseDown = false;
                clear(); // efface le canvas pour réafficher l'image seule'
                ctxCanvas.drawImage(image[0], 0, 0, ctxCanvas.canvas.width, ctxCanvas.canvas.height);
            });

// drawing functions
function clear() { // clear canvas function
    ctxCanvas.clearRect(0, 0, ctxCanvas.canvas.width, ctxCanvas.canvas.height);
}

// fonction principale appelée toutes les 30ms
function drawScene() {
    if (bMouseDown) { // drawing zoom area
        clear(); // clear canvas
//        ctxCanvas.drawImage(image, 0 - iMouseX * (iZoomPower - 1), 0 - iMouseY * (iZoomPower - 1), ctxCanvas.canvas.width * iZoomPower, ctxCanvas.canvas.height * iZoomPower);
        ctxCanvas.drawImage(image[0], iMouseX * (1-parametres.zoomLoupe), iMouseY * (1-parametres.zoomLoupe), ctxCanvas.canvas.width *parametres.zoomLoupe, ctxCanvas.canvas.height * parametres.zoomLoupe);
        ctxCanvas.globalCompositeOperation = 'destination-atop';

         ctxCanvas.beginPath();
        ctxCanvas.arc(iMouseX, iMouseY, parametres.rayonLoupe, 0, Math.PI*2, true); 
        ctxCanvas.closePath();
        ctxCanvas.fill();
        ctxCanvas.drawImage(image[0], 0, 0, ctxCanvas.canvas.width, ctxCanvas.canvas.height);
    }
    
}

    setInterval(drawScene, 30); // appel toutes les 30ms de la fonction drawScene


        });
    };
}) (jQuery);

