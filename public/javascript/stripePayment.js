var stripe = Stripe('pk_test_EqumhjKd2yDQpLAkL0FfffWO00zbR2Knni');
var elements = stripe.elements();

var style = {
  base: {
    fontSize: '20px',
    color: "#32325d",
  }
};

var card = elements.create('card', {hidePostalCode: true,style: style});
card.mount('#card-element');



var form = document.getElementById('payment-form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  let canSubmitForm = true;

  //If the user wants to enter its own info but it isnt valid
  if(currentlyToggledBlocIndex == 1 && !validateUserAddressForm()){
    $("#informationsLink").click();
    canSubmitForm = false;
  }

  //if the form can be submitted
  if(canSubmitForm)
  {
    stripe.createToken(card).then(function(result) {
      if (result.error) {
        // Inform the customer that there was an error.
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        // Send the token to your server.
        stripeTokenHandler(result.token);
      }
    });
  }

});


const stripeTokenHandler = (token) => {

  //Object that contains all the infos about
  //the user entered address
  let userManualAddressInfos = undefined;

  //If the user wants to use a custom address
  if (currentlyToggledBlocIndex == 1) {
    userManualAddressInfos = {
      countryId: formIdCountry.value,
      provinceId: formIdProvince.value,
      noApp: formNoApp.value,
      postalCode: formPostalCode.value,
      noCivic: formNoCivic.value,
      street: formStreet.value 
    }
  }

  $.ajax({
      url: "http://localhost:8000/ajaxRequest/stripePayment",
      method: "POST",
      data: {
      	stripeToken: token.id,
        userManualAddressInfos: userManualAddressInfos
      },
      success: function(response) {
          $("#successPayment").html(paymentSuccessfull)
          popup("Paiement effectué avec succès!")
          $("#payment-form").reset();
      },
      error: function(response) {
       
      }
  });

  
}