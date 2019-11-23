$(document).ready(function (){
    $('.submit').click(function(event){

        var fName= $('.f-name').val();
        var name= $('.name').val();
        var email= $('.email').val();
        var phone= $('.phone-number').val();
        var message= $('.message').val();
        var statusElm = $('.status');
        statusElm.empty();

        var reText=/^[0-9 a-zàâçéèêëîïôûùüÿñæœ ,.'-]+$/i;
        var reEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var rePhone=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        if(!(reText.test(fName))){
            event.preventDefault();
            alert("Erreur dans le prenom");
        }
        if(!(reText.test(name))){
            event.preventDefault();
            alert("Erreur dans le nom de famille");
        }
        if(!(reEmail.test(email))){
            event.preventDefault();
            alert("Erreur dans le courriel");
        }
        if(!(rePhone.test(phone))){
            event.preventDefault();
            alert("Erreur dans le numero de telephone");
        }
        }
    )
});



