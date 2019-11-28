var stripe = Stripe('pk_test_EqumhjKd2yDQpLAkL0FfffWO00zbR2Knni');
var elements = stripe.elements();

var style = {
  base: {
    fontSize: '16px',
    color: "#32325d",
  }
};

var card = elements.create('card', {style: style});
card.mount('#card-element');