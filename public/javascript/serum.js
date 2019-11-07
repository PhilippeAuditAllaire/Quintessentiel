$(document).ready(function (){
    $('.submit').click(function(event){

        var fName= $('.f-name').val();
        var name= $('.name').val();
        var age= $('.age').val();
        var gender= $('.gender').val();
        var phone= $('.phone-number').val();
        var email= $('.email').val();
        var timeTrouble= $('.time-trouble').val();
        var allergy= $('.allergy-desc').val();

        var reGender=/\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|/;
        var reText=/^[a-z ,.'-]+$/;
        var reNum=/^([1-9][0-9]{0,2}|1000)$/;
        var reEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var rePhone=/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

        if(!(reText.test(fName))){
            event.preventDefault();
            alert("Erreur dans le prenom.");
        }
        if(!(reText.test(name))){
            event.preventDefault();
            alert("Erreur dans le nom de famille.");
        }
        if(!(reNum.test(age))){
            event.preventDefault();
            alert("Erreur dans l'âge.");
        }
        if(!(reGender.test(gender))){
            event.preventDefault();
            alert("Erreur dans le genre.");
        }
        if(!(rePhone.test(phone))){
            event.preventDefault();
            alert("Erreur dans le numero de telephone.");
        }
        if(!(reEmail.test(email))){
            event.preventDefault();
            alert("Erreur dans le courriel.");
        }
        if(!(reText.test(timeTrouble))){
            event.preventDefault();
            alert("Erreur dans la durée des maux.");
        }
        if(!(reText.test(allergy))){
            event.preventDefault();
            alert("Erreur dans la description des allergies.");
        }
        
        }
    )
});