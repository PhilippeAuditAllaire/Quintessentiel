
//Adds the given product ID to the
//session
//@productId is the product to add
//to the cart
function addProductToCart(productId)
{
	console.log("Test");
	
	$.ajax({
		url: "/ajaxRequest/addProductToCart",
		type: "POST",
		data: {
			productId: productId
		},
		success:function(res){
			console.log("Fin de l'ajout")
			console.log(res);
		}
	})
	
}