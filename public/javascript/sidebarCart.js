/*

	Script for the side bar cart

*/

let userCart = [];

//Side menu elements
let cartLink = document.getElementById("cartLink"); //Open Cart icon
let closeCartLink = document.getElementById("closeCartIcon"); //Close cart icon

let fullPageOverlay = document.getElementById("fullPageOverlay"); //page overlay
let cartWrapper = document.getElementById("cartWrapper"); //Cart wrapper



//Opens the sidebar menu
function openCartMenu()
{
	clearAllErrorItems()

	fullPageOverlay.style.display = "block";
	cartWrapper.style.display = "inline-block";
	setTimeout(function(){
		fullPageOverlay.classList.add("toggled");
		cartWrapper.classList.add("toggled");
	});

	eventPageOverlay = $(fullPageOverlay).one("click",closeCartMenu)
}

//Closes the cart menu
function closeCartMenu()
{	
	console.log("close")

	//Hide the overlay
	fullPageOverlay.classList.remove("toggled");
	cartWrapper.classList.remove("toggled");

	//On the transition end of the remove, set the element's display to none
	transitionEndOverlay = $(fullPageOverlay).one("transitionend",function(e){
		console.log("Fin de la transition overlay")
		fullPageOverlay.style.display = "none";
	});

	//On the transition end of the remove, set the element's display to none
	transitionEndCart = $(cartWrapper).one("transitionend",function(e){
		console.log("Fin de la transition cart")
		cartWrapper.style.display = "none";
	});

}

//Displays all the items that are in the 
//user's cart
//@cartItemsArray is the array of items
//the user has in his cart
function displayCartItems(){
	console.log("asdfasdf")
	$("#cartContentWrapper").html("");
	let indexInArray = 0;

	userCart.forEach(function(item){
		console.log(item)
		console.log("here")
		$("#cartContentWrapper").html($("#cartContentWrapper").html() + `<div class="cartContentWrapper">
                <div class="cart-item" data-cartItemId="`+item.product._id+`" data-indexInArray="`+indexInArray+`">
                    <div class="cart-item-inside">
                        <div class="itemUpperInfos">
                            <div class="wrapperItemImage">
                                <div class="itemImage">
                                    <img src="./images/logo.png"/>
                                </div>
                            </div>
                            <div class="itemTitle">
                                `+item.product._name+`
                            </div>
                            <div class="itemClose">
                                <a href="#"><img src="./images/icons/BlackCartCloseIcon.svg"/></a>
                            </div>
                        </div>
                        <div class="itemBottomInfos">
                            <div class="cartItemQuantity">
                                <label>Quantité:<input type="number" name="cartItemQty" class="cartItemQty" value="`+parseInt(item.qtyInCart)+`"/></label>
                            </div>
                            <div class="cartItemPrice">
                                <p>`+parseInt(item.product._retailPrice)+`$</p>
                            </div>
                        </div>
                        <div class="wrapper-cart-error">
                            <p>Quantité trop élevée!</p>
                        </div>
                    </div>
                </div>
            </div> 
           `);

		//On item quantity change, check if its fine and
		//update its quantity servside
		$(".cartItemQty").on("change",function(e){
			let element = e.target.closest(".cart-item");
			let elementIndexInArray = element.getAttribute("data-indexInArray");

			validateItemQty(e.target);
			addProductToCart(userCart[elementIndexInArray].product._id,e.target.value);
		})

		indexInArray++;
			
	})
}



//When the cart items have been loaded for the first time
loadCartItem().then(function(){ 

	let cartItemQty = document.getElementsByClassName("cartItemQty");

	for(let i = 0;i < cartItemQty.length;i++)
	{
		validateItemQty(cartItemQty[i]);
	}
	
})

//Checks if the given element can
//have that required qty (found in the input)
function validateItemQty(target)
{
	let element = target.closest(".cart-item");
	let elementIndexInArray = element.getAttribute("data-indexInArray");
	let errorP = element.getElementsByClassName("wrapper-cart-error")[0].getElementsByTagName("p")[0];

	let qtyInput = element.getElementsByClassName("cartItemQty")[0]
	let elementQtyInCart = qtyInput.value;
	let maxElementQty = userCart[elementIndexInArray].product._qty;

	if(elementQtyInCart <= 0){ //If the user qty is 0 or less
		qtyInput.value = 1;
		displayErrorItem(errorP,"La quantité ne peut pas être plus petite que 1.")
	}
	else if(elementQtyInCart > maxElementQty) //If the user qty is bigger than the max qty
	{
		qtyInput.value = maxElementQty;
		displayErrorItem(errorP,"La quantité dépasse la quantité en stock.")
	}
	else{
		clearErrorItem(errorP)
		return true; //The quantity was valid
	}

	return false; //The quantity was invalid
}

//Displays the given error message in the given
//error wrapper
//@errorWrapper is the element in which to display
//the given error
//@errorMsg is the message to display in the given
//error wrapper
function displayErrorItem(errorWrapper,errorMsg)
{
	errorWrapper.classList.add("toggled");
	errorWrapper.innerHTML = errorMsg;
}


//Clear all the error messages of the cart
function clearAllErrorItems()
{

	let allErrorWrapper = document.getElementsByClassName("wrapper-cart-error");

	for(let i = 0;i < allErrorWrapper.length;i++)
	{	
		let errorP = allErrorWrapper[i].getElementsByTagName("p")[0];

		clearErrorItem(errorP);
	}
}

//Removes and hides an errorMessage
//@errorWrapper is the error to hide
function clearErrorItem(errorWrapper)
{
	errorWrapper.classList.remove("toggled");
}

//Loads all the items that
//are in the user's cart
//displayItems is a bool that either displays
//the items or not after the cart items have been 
//loaded from the server
function loadCartItem(displayItems=true)
{
	return $.ajax({
		url: "/ajaxRequest/loadCartItem",
		type: "POST",
		success: function(res){
			userCart = res;

			if(displayItems && userCart.length > 0){
				console.log("called from here");
				console.log(userCart);
				displayCartItems();
			}
			else{
				console.log("empty")
				$("#cartContentWrapper").html("Le panier est vide.");
			}
		}
	});
}



//Adds the given product ID to the
//session
//@productId is the product to add
//to the cart
function addProductToCart(productId,quantity)
{	
	$.ajax({
		url: "/ajaxRequest/addProductToCart",
		type: "POST",
		data: {
			productId: productId,
			qty: quantity
		},
		success:function(res){

		}
	})
}


cartLink.addEventListener("click",openCartMenu);
closeCartLink.addEventListener("click",closeCartMenu);