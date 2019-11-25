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
	console.log("allo")
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
                                <a href="#" class='removeElement'><img src="./images/icons/BlackCartCloseIcon.svg"/></a>
                            </div>
                        </div>
                        <div class="itemBottomInfos">
                            <div class="cartItemQuantity">
                                <label>Quantité:<input type="number" name="cartItemQty" class="cartItemQty" value="`+parseInt(item.qtyInCart)+`"/></label>
                            </div>
                            <div class="cartItemPrice">
                                <p>`+calculateItemPrice(item._qtyInCart,item.product._retailPrice)+`</p>
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
			let cartItemPrice = element.getElementsByClassName("cartItemPrice")[0];
			let cartSubTotalWrapper = document.getElementById("cartSubTotal");

			validateItemQty(e.target);
			addProductToCart(userCart[elementIndexInArray].product._id,e.target.value);
			loadCartItem(false).then(function(){ //When we loaded the cart items again
			 displayItemPrice(cartItemPrice,calculateItemPrice(userCart[elementIndexInArray].qtyInCart,userCart[elementIndexInArray].product._retailPrice))
			 displaySubTotal(cartSubTotalWrapper,calculateSubTotal())
			});
		})

		$(".removeElement").on("click",function(e){
			let element = e.target.closest(".cart-item");
			let elementIndexInArray = element.getAttribute("data-indexInArray");
			let cartItemPrice = element.getElementsByClassName("cartItemPrice")[0];
			let cartSubTotalWrapper = document.getElementById("cartSubTotal");

			removeProductFromCart(userCart[elementIndexInArray].product._id);
			loadCartItem(false).then(function(){ //When we loaded the cart items again
			 displayItemPrice(cartItemPrice,calculateItemPrice(userCart[elementIndexInArray].qtyInCart,userCart[elementIndexInArray].product._retailPrice))
			 displaySubTotal(cartSubTotalWrapper,calculateSubTotal())
			});
		});

		indexInArray++;
			
	})
}



//When the cart items have been loaded for the first time
loadCartItem().then(function(){ 

	let cartItemQty = document.getElementsByClassName("cartItemQty");
	let cartItemPrice = document.getElementsByClassName("cartItemPrice");
	let cartSubTotalWrapper = document.getElementById("cartSubTotal");

	for(let i = 0;i < userCart.length;i++) //For each items in the cart
	{
		validateItemQty(cartItemQty[i]); //Validate its quantity
		displayItemPrice(cartItemPrice[i],calculateItemPrice(userCart[i].qtyInCart,userCart[i].product._retailPrice));
		displaySubTotal(cartSubTotalWrapper,calculateSubTotal())
	}
	
});

//Displays the price of an item
//@priceElement is the element that shall
//contain the price
//@price is the price to put in the @priceElement
function displayItemPrice(priceElement,price)
{
	priceElement.innerHTML = price + "$";
}

//Calculates the sub total based
//on every item price
function calculateSubTotal()
{	
	let subTotal = 0;

	for(let i = 0;i < userCart.length;i++) //For each item in the cart
	{
		let itemPrice = parseFloat(calculateItemPrice(userCart[i].qtyInCart,userCart[i].product._retailPrice));
		subTotal += itemPrice;
	}

	return subTotal.toFixed(2);
}

//Displays the sub total
//@subTotalElement is the element that will have the subTotal in it
//@price is the price to put in the sub total element
function displaySubTotal(subTotalElement,price)
{
	subTotalElement.innerHTML = price + "$";
}

//Calculates the price of an item based on its
//@itemQty and on its
//@individualItemPrice
//@Returns the total price of an item
function calculateItemPrice(itemQty,individualItemPrice)
{
	return ((itemQty * (individualItemPrice)*100) / 100).toFixed(2);
}

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
				displayCartItems();
			}
			else if(displayItems){
				$("#cartContentWrapper").html("Le panier est vide.");
			}

			return;
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

//Removes the given product ID from the
//cart session
//@productId is the id of the product to remove
//from the cart
function removeProductFromCart(productId)
{
	$.ajax({
		url: "/ajaxRequest/removeProductFromCart",
		type: "POST",
		data: {
			productId: productId
		},
		success:function(res){
			console.log("removed it!");
		}
	})
}


cartLink.addEventListener("click",openCartMenu);
closeCartLink.addEventListener("click",closeCartMenu);