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

  stripe.createToken(card).then(function(result) {
  	console.log(result)
    if (result.error) {
      // Inform the customer that there was an error.
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      // Send the token to your server.
      stripeTokenHandler(result.token);
    }
  });
});


const stripeTokenHandler = (token) => {
  
  console.log(token);
  console.log(token.id);

  $.ajax({
      url: "http://localhost:8000/ajaxRequest/stripePayment",
      method: "POST",
      data: {
      	stripeToken: token.id
      },
      success: function(response) {
          
      },
      error: function(response) {
       
      }
  });

  
}