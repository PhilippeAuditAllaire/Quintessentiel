/*

	Script for the side bar cart

*/

//Side menu elements
let cartLink = document.getElementById("cartLink"); //Open Cart icon
let closeCartLink = document.getElementById("closeCartIcon"); //Close cart icon

let fullPageOverlay = document.getElementById("fullPageOverlay"); //page overlay
let cartWrapper = document.getElementById("cartWrapper"); //Cart wrapper



//Opens the sidebar menu
function openCartMenu()
{
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

cartLink.addEventListener("click",openCartMenu);
closeCartLink.addEventListener("click",closeCartMenu);