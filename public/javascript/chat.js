let clientChat = document.getElementById("clientChat");
let chatTopbar = document.getElementById("chatTopbar");
let isChatWindowOpened = false;
let isConversationEnded = false;

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

	if(!isConversationEnded) //If the converstaion is still going
	{
		let message = document.getElementById("sendMessage").value;

		//If the message contains something
		if(message != ""){
			socket.emit("sendMessage",{message:message});
		}
	}
	else{ //If it has ended
		popup("La conversation est fermée.")
	}
})


socket.on("incomingMessage",(messageInfos) =>{
	console.log("incomingMessage!")
	console.log(messageInfos)
	displayMessage(messageInfos.message,messageInfos.isAdmin)
});

socket.on("discussionAlreadyStarted",(informations) =>{
	showChatBodyDiscussion();
	toggleChatWindow();
	addAllInformations(informations);
})

socket.on("conversationEnded",() =>{
	console.log("The admin has ended the conversation")
	let p = document.createElement("p");
	p.classList.add("conversationEndedP")
	p.innerHTML = "La conversation est terminée.";

	isConversationEnded = true;

	chatMessageBox.appendChild(p)
})

//Adds the given informations to the chat window
function addAllInformations(informations)
{
	for(let i = 0;i < informations.messages.length;i++)
	{
		let message = informations.messages[i];
		displayMessage(message.message,message.isAdmin);
	}
}

//Displays a message in the chat window
function displayMessage(message,isAdmin)
{
	let chatWindow = document.getElementById("chatMessageBox");

	let divSingleMsg = document.createElement("div");
	divSingleMsg.classList.add("wrapperSingleMessage");
	

	let msgWrapper = document.createElement("div");
	msgWrapper.classList.add("messageWrapper");

	let pUsername = document.createElement("p");
	pUsername.classList.add("msgUserName");

	//If the message comes from an admin
	if(isAdmin){
		pUsername.innerHTML = "Admin"
		divSingleMsg.classList.add("wrapperMsgAdmin");
	}
	else{ //If the message comes from the user himself
		pUsername.innerHTML = "Vous"
		divSingleMsg.classList.add("wrapperMsgClient");
	}


	let pMessage = document.createElement("p");
	pMessage.classList.add("msgUserText");
	pMessage.innerHTML = message;

	msgWrapper.appendChild(pUsername);
	msgWrapper.appendChild(pMessage);

	divSingleMsg.appendChild(msgWrapper);

	chatWindow.appendChild(divSingleMsg);
}

//Shows the chat panel instead of the start discussion panel
//on the chat bar
function showChatBodyDiscussion()
{
	let chatBodyDiscussion = document.getElementById("chatBodyDiscussion");
	let chatBodyStartDiscussion = document.getElementById("chatBodyStartDiscussion");

	chatBodyStartDiscussion.style.display = "none";
	chatBodyDiscussion.style.display = "block";
}

