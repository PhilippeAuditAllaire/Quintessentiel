
//Adds the given product ID to the
//session
//@productId is the product to add
//to the cart
function addProductToCart(productId)
{	
	$.ajax({
		url: "/ajaxRequest/addProductToCart",
		type: "POST",
		data: {
			productId: productId
		},
		success:function(res){

		}
	})
}

loadCartItem()
//Loads all the items that
//are in the user's cart
function loadCartItem()
{
	$.ajax({
		url: "/ajaxRequest/loadCartItem",
		type: "POST",
		success: function(res){
			console.log("Voici les items de cart")
			console.log(res);
		}
	})
}