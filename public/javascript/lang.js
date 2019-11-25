 // call ajax lang
 $.ajax({
     url: "http://localhost:8000/ajaxRequest/lang",
     method: "POST",

     success: function(response) {
         console.log(response);
         $("#lang-dropdown").html(response);

     },
     error: function(response) {
         console.log(response);
         alert("Erreur dans l'affichage des langues");
     }
 });
 /*
  $.ajax({
      url: "http://localhost:8000/ajaxRequest/defLang",
      method: "POST",

      success: function(response) {

      },
      error: function(response) {
          console.log(response);
          alert("Erreur dans l'affichage des langues");
      }
  });
 */
 function changeLang(id) {
     console.log("change" + id);

     $.ajax({
         url: "http://localhost:8000/ajaxRequest/changeLang",
         method: "POST",
         data: {
             id_lang: id
         },
         success: function(response) {
             console.log("change lang success " + response);
             location.reload();
         },
         error: function(response) {
             console.log(response);
             alert("Erreur dans l'affichage des langues");
         }
     });
 }


 // call ajax lang choisie -> var session