/*
	This script displays a popup with the given message
	In the case where a popup would be generated when one
	is already being displayed, the current popup would 
	dissapear and THEN, the hide popup function would call
	another popup. 

	So if the user spams the popups only the last one will
	be displayed.
*/



let popupElement = document.getElementById("popup");
let popupMessage = document.getElementById("popupMessage");
let currentPopupTimeout;

/* Spawns a popup with the desired message */
function popup(message)
{
	if(currentPopupTimeout == undefined) //There is no popup atm
	{
		popupElement.classList.add("show");
		popupMessage.innerHTML = message;

		currentPopupTimeout = setTimeout(function(){
			hidePopup(false);
		},3000);	
	}
	else{ //There's actually a popup, so queue this one
		hidePopup(true,message);
	}
}


//Hides the popup that is currently
//displayed
//@recallPopup is a boolean telling whether
//or not this function should callback popup after
//the popup has finished dissapearing
//@_callbackMsg is the message the callback will
//display
function hidePopup(recallPopup,_callbackMsg)
{	
	popupElement.classList.remove("show");
	clearTimeout(currentPopupTimeout);
	currentPopupTimeout = undefined;

	if(recallPopup){ //If there's another popup waiting

		//Remove the other transitionend if any (its a single item queue only)
		$(popupElement).off();

		//When the popup is hidden
		$(popupElement).one("transitionend",function(){
			popup(_callbackMsg);
		})

	}
}