let clientChat = document.getElementById("clientChat");
let chatTopbar = document.getElementById("chatTopbar");
let isChatWindowOpened = false;


//When clicking on the chat topbar
chatTopbar.addEventListener("click",toggleChatWindow)

//Opens or closes the chat window
function toggleChatWindow()
{
	if(isChatWindowOpened){ //If the window is opened, close it
		clientChat.classList.remove("opened");
		isChatWindowOpened = false;
	}
	else{ //if the window is closed, open it
		clientChat.classList.add("opened");
		isChatWindowOpened = true;
	}
}

//Connect to the namespace
var socket = io.connect('/client');


//On the start chat button click
let btnStartChat = document.getElementById("btnStartChat");

btnStartChat.addEventListener("click",() => {
	let startInputName = document.getElementById("startInputName").value;
	let startQuestion = document.getElementById("startQuestion").value;

	if(startInputName != "" && startQuestion != ""){
		socket.emit("startDiscussion",{username:startInputName,question:startQuestion})
		showChatBodyDiscussion();
	}
});

//On the send message button click
let btnSendMessage = document.getElementById("btnChatSendMessage");

btnSendMessage.addEventListener("click",() => {
	let message = document.getElementById("sendMessage").value;

	//If the message contains something
	if(message != ""){
		socket.emit("sendMessage",{message:message});
	}
})


socket.on("incomingMessage",(messageInfos) =>{
	console.log(messageInfos)
})

socket.on("discussionAlreadyStarted",(informations) =>{

	console.log("Le client est déjà en discussion!");
	showChatBodyDiscussion();
	toggleChatWindow();
	console.log(informations)


})


//Shows the chat panel instead of the start discussion panel
//on the chat bar
function showChatBodyDiscussion()
{
	let chatBodyDiscussion = document.getElementById("chatBodyDiscussion");
	let chatBodyStartDiscussion = document.getElementById("chatBodyStartDiscussion");

	chatBodyStartDiscussion.style.display = "none";
	chatBodyDiscussion.style.display = "block";
}