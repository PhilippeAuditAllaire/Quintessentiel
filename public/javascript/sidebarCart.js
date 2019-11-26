/*

	Script for the side bar cart

*/

let userCart = [];

//Side menu elements
let cartLink = document.getElementById("cartLink"); //Open Cart icon
let closeCartLink = document.getElementById("closeCartIcon"); //Close cart icon

let fullPageOverlay = document.getElementById("fullPageOverlay"); //page overlay
let cartWrapper = document.getElementById("cartWrapper"); //Cart wrapper
let cartSubTotalWrapper = document.getElementById("cartSubTotal"); //The sub total wrapper


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
	console.log("display cart items!");

	$("#cartContentWrapper").html("");

	let indexInArray = 0;

	if(userCart.length > 0){ //If there's nothing in the cart

		userCart.forEach(function(item){
			console.log(item)
			let itemQty = validateItemQty(item.qtyInCart,item.product._qty); //Validate its quantity

			$("#cartContentWrapper").html($("#cartContentWrapper").html() + `
	                <div class="cart-item" data-cartItemId="`+item.product._id+`">
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
	                                <label>Quantité:<input type="number" name="cartItemQty" class="cartItemQty" value="`+itemQty+`"/></label>
	                            </div>
	                            <div class="cartItemPrice">
	                                <p>`+calculateItemPrice(itemQty,item.product._retailPrice)+`$</p>
	                            </div>
	                        </div>
	                        <div class="wrapper-cart-error">
	                            <p>Quantité trop élevée!</p>
	                        </div>
	                    </div>
	                </div>
	           `);

			//On item quantity change, check if its fine and
			//update its quantity servside
			$(".cartItemQty").on("change",function(e){
				let element = e.target.closest(".cart-item");

				let elementIndexInArray = getCartElementIndexInArray(element);
				let cartItemPrice = element.getElementsByClassName("cartItemPrice")[0]; //Price wrapper for this item
				let cartSubTotalWrapper = document.getElementById("cartSubTotal");

				checkItemQty(e.target);
				addProductToCart(userCart[elementIndexInArray].product._id,e.target.value);
				loadCartItem().then(function(){ //When we loaded the cart items again
				 displayItemPrice(cartItemPrice,calculateItemPrice(userCart[elementIndexInArray].qtyInCart,userCart[elementIndexInArray].product._retailPrice))
				 displaySubTotal(cartSubTotalWrapper,calculateSubTotal())
				});
			})

			//On the remove element click
			//Remove it from the cart and from the GUI
			$(".removeElement").on("click",function(e){

				let element = e.target.closest(".cart-item");
				let elementIndexInArray = getCartElementIndexInArray(element);
				let cartItemPrice = element.getElementsByClassName("cartItemPrice")[0];
				let cartSubTotalWrapper = document.getElementById("cartSubTotal");

				//Remove the product from the cart, loads the item list back and then display everything
				removeProductFromCart(userCart[elementIndexInArray].product._id).then(function(){
					loadCartItem().then(function(){
						element.classList.add("disappear");

						//Once the dissapear animation has been executed
						element.addEventListener("animationend",function(){
							element.remove();	

							if(userCart.length <= 0){
								$("#cartContentWrapper").html("Votre panier est vide.");
							}						
						});

						displaySubTotal(cartSubTotalWrapper,calculateSubTotal());
					});
				});
			});	

			indexInArray++;
		})	
	}
	else{
		$("#cartContentWrapper").html("Votre panier est vide.");
	}	

	displaySubTotal(cartSubTotalWrapper,calculateSubTotal());
}




loadCartItem().then(() => displayCartItems());	//on items load, display them

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
function checkItemQty(target)
{
	let element = target.closest(".cart-item");
	let elementIndexInArray = getCartElementIndexInArray(element);
	let errorP = element.getElementsByClassName("wrapper-cart-error")[0].getElementsByTagName("p")[0];

	let qtyInput = element.getElementsByClassName("cartItemQty")[0]
	let elementQtyInCart = qtyInput.value;
	let maxElementQty = userCart[elementIndexInArray].product._qty;

	let validatedItemQty = validateItemQty(elementQtyInCart,maxElementQty);
	
	if(validatedItemQty == 1 && elementQtyInCart != 1) //If the quantity has been fixed
	{
		displayErrorItem(errorP,"La quantité ne peut pas être plus petite que 1.");
		qtyInput.value = validatedItemQty;
		return false;
	}
	else if(validatedItemQty == maxElementQty && validatedItemQty != elementQtyInCart) //if the quantity has been fixed
	{
		displayErrorItem(errorP,"La quantité dépasse la quantité en stock.");
		qtyInput.value = validatedItemQty;
		return false;
	}
	else{	//The quantity has not been fixed (already valid)
		clearErrorItem(errorP)
		return true;
	}
}


function getCartElementIndexInArray(element)
{
	let cartItems = $(".cart-item");

	return cartItems.index(element);
}

//Checks if the given quantity vs the given maxElement
//match or not
//@qtyInCart is the quantity of this element the user
//has in his cart
//@maxElementQty is the maximum quantity of this element
//the user can have in his cart
//@Returns the fixed quantity
function validateItemQty(qtyInCart,maxElementQty)
{
	if(qtyInCart <= 0){ //If the user qty is 0 or less
		return 1;
	}
	else if(qtyInCart > maxElementQty) //If the user qty is bigger than the max qty
	{
		return maxElementQty;
	}
	else{
		return qtyInCart; //The quantity was valid
	}
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
function loadCartItem()
{
	return $.ajax({
		url: "/ajaxRequest/loadCartItem",
		type: "POST",
		success: function(res){
			userCart = res;

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
	return $.ajax({
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