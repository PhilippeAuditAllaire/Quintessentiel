let clientChat = document.getElementById("clientChat");
let chatTopbar = document.getElementById("chatTopbar");
let isChatWindowOpened = false;


//When clicking on the chat topbar
chatTopbar.addEventListener("click",() =>{

	if(isChatWindowOpened){ //If the window is opened, close it
		clientChat.classList.remove("opened");
		isChatWindowOpened = false;
	}
	else{ //if the window is closed, open it
		clientChat.classList.add("opened");
		isChatWindowOpened = true;
	}
})