/* 
 AfpaCréteil CDI
 DB 2016
01_TP_JS_ExpReg.js
 */
function testMatch() {
  var re = new RegExp(document.getElementById("idRegEx").value);
  if (document.getElementById("idChaine").value.match(re)) {
    document.getElementById("idResult").value = "bravo !!";
  } else {
    document.getElementById("idResult").value = "pas bon !!";
  }
}

function raz(){
    document.getElementById("idResult").value = "";
}

