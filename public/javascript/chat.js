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


//Connect to the namespace
var socket = io.connect('/client');


//On the start chat button click
let btnStartChat = document.getElementById("btnStartChat");

btnStartChat.addEventListener("click",() => {
	console.log("clicked")
	let startInputName = document.getElementById("startInputName").value;
	let startQuestion = document.getElementById("startMessage").value;

	if(startInputName != "" && startMessage != ""){
		socket.emit("startDiscussion",{username:startInputName,question:startQuestion})
	}

})