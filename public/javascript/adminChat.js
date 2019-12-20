let socket = io.connect('http://localhost:8000/admin');

let currentRoomId;


let allConnectedClients = [];


socket.on("startDiscussion",(data) =>{
	console.log(data)
	data.isActive = 1;

	addNewDiscussion(data);
});


socket.on("incomingMessage",(message) =>{
	insertIncomingMessage(message);
});

let test;

socket.on("updateSocketId", (infos) => {

	updateSocketIdByRoom(infos.roomId,infos.socketId)
})

socket.on("discussionAlreadyStarted", (infos) => {
	test= infos
	displayAllRoomsAndMessages(infos);
})

socket.on("userDisconnected", (infos) => {
	userDisconnected(infos);
})

socket.on("deleteConversation", (infos) => {
	console.log("A conversation has been deleted");
	deleteHTMLConversation(infos);
})

//Adds a new discussion to the left
//list
function addNewDiscussion(userInfos)
{
	let contactBar = document.getElementById("contact-bar")

	//Main wrappers
	let li = document.createElement("li");
	let linkTab = document.createElement("a");
	linkTab.href = "#chat"+userInfos.roomId;
	linkTab.classList.add("single-contact");
	linkTab.setAttribute("data-toggle","tab");
	linkTab.setAttribute("data-roomId",userInfos.roomId);
	linkTab.addEventListener("click",(e) =>{
		switchPane(e.target);
	})


	
	//First div wrapper
	let titleBarDiv = document.createElement("div");
	titleBarDiv.classList.add("contact-title-bar");

	let pProblem = document.createElement("p");
	let spanProblem = document.createElement("span");
	spanProblem.classList.add("title-contact");
	spanProblem.innerHTML = userInfos.question;

	//Second div wrapper
	let divContact = document.createElement("div");
	divContact.classList.add("contact-name-bar");

	let pContact = document.createElement("p");
	let spanContact = document.createElement("span");
	spanContact.classList.add("contact-name");
	spanContact.innerHTML = userInfos.username;


	//Third div wrapper
	let divActivity = document.createElement("div");
	divActivity.classList.add("contact-activity");

	let pActivity = document.createElement("p");
	let spanActivity = document.createElement("span");
	spanActivity.classList.add("contact-active");
	

	pActivity.innerHTML = "État: ";

	//If the room is currently active
	if(userInfos.isActive){
		spanActivity.innerHTML = "Actif"
		spanActivity.classList.add("contact-ok");
	}
	else{
		spanActivity.innerHTML = "Déconnecté"
		spanActivity.classList.add("contact-not");
	}
	
	pActivity.appendChild(spanActivity);



 	//Wrapp it all up
	pActivity.appendChild(spanActivity);
	divActivity.appendChild(pActivity);

    pContact.appendChild(spanContact);
	divContact.appendChild(pContact);

	pProblem.appendChild(spanProblem);
	titleBarDiv.appendChild(pProblem);

	linkTab.appendChild(titleBarDiv);
	linkTab.appendChild(divContact);
	linkTab.appendChild(divActivity);

    li.appendChild(linkTab);

    contactBar.appendChild(li);


    createMessageBox(userInfos.roomId,userInfos.isActive);


    allConnectedClients.push({
    	roomId: userInfos.roomId,
    	username: userInfos.username,
    	socketId: userInfos.socketId
    })
}

//Creates the div where all the messages
//of a discussion will be stored
function createMessageBox(roomId,isActive){

	let rightBarBody = document.getElementById("rightBarBody");

	let messageBoxWrapper = document.createElement("div");
	messageBoxWrapper.id = "chat"+roomId;
	messageBoxWrapper.classList.add("tab-pane");
	messageBoxWrapper.classList.add("fade");

	let eventBanner = document.createElement("div");
	eventBanner.classList.add("eventBanner");
	eventBanner.innerHTML = "L'utilisateur s'est déconnecté!"
	//If the user isnt active
	if(!isActive){
		eventBanner.classList.add("showBanner")
	}

	messageBoxWrapper.appendChild(eventBanner);
	rightBarBody.appendChild(messageBoxWrapper);
}

//Switches between a discussion to another
function switchPane(pane)
{
	let clickedPane = $(pane).closest(".single-contact")[0];
	let panelRoomId = clickedPane.getAttribute("data-roomId");

	currentRoomId = panelRoomId;
}


//When clicking on the submit button
let btnSend = document.getElementById("btnSend");

btnSend.addEventListener("click",() =>{

	let message = document.getElementById("inputMsg").value;

	//If there is something in the message box
	if(message != "")
	{	
		//Get the socket to which we need to send the message
		let socketId = getSocketIdFromRoomId(currentRoomId);

		socket.emit("sendMessage",{roomId: currentRoomId,toSocketId: socketId,message: message})
	}

});


//Gets the socket id from the given
//room id
function getSocketIdFromRoomId(roomId)
{
	for(let i = 0;i < allConnectedClients.length;i++)
	{
		//if the roomId is the same as the one the
		//admin wants to send a message to
		if(allConnectedClients[i].roomId == roomId)
		{
			return allConnectedClients[i].socketId;
		}
	}
}

//Updates the socket id of a room by finding it 
//into the all Connected Clients list
//@roomId is the id of the room to look for
//@newSocketId is the socketId that will replace
//the older one
function updateSocketIdByRoom(roomId,newSocketId)
{
	for(let i = 0;i < allConnectedClients.length;i++)
	{
		//if the roomId is the same as the one the
		//admin wants to send a message to
		if(allConnectedClients[i].roomId == roomId)
		{
			allConnectedClients[i].socketId = newSocketId;
			return;
		}
	}
}

//Displays all the rooms and the messages
function displayAllRoomsAndMessages(allRoomAndMessagesInfos)
{

	for(let i = 0;i < allRoomAndMessagesInfos.rooms.length;i++)
	{	
		//Create the new discussion
		addNewDiscussion({
			roomId: allRoomAndMessagesInfos.rooms[i].roomId,
			username: allRoomAndMessagesInfos.rooms[i].username,
			question: allRoomAndMessagesInfos.rooms[i].question,
			socketId: allRoomAndMessagesInfos.rooms[i].socketId,
			isActive: allRoomAndMessagesInfos.rooms[i].isActive
		})

		//Display the messages in the room
		for(let j = 0;j < allRoomAndMessagesInfos.rooms[i].messages.length;j++)
		{
			addNewMessage(allRoomAndMessagesInfos.rooms[i].username,
						allRoomAndMessagesInfos.rooms[i].roomId,
						allRoomAndMessagesInfos.rooms[i].messages[j]);
		}
		
	}
}

//Gathers the infos and then inserts
//the incoming message
function insertIncomingMessage(msgInfos)
{
	let username;

	//Look for the client's username
	for(let i = 0;i < allConnectedClients.length;i++)
	{
		if(allConnectedClients[i].roomId == msgInfos.chatRoomId)
		{
			username = allConnectedClients[i].username;
		}
	}

	addNewMessage(username,msgInfos.chatRoomId,{isAdmin:msgInfos.isAdmin,message:msgInfos.message})
}

//Adds a new message to a pane
function addNewMessage(username,roomId,messageObj)
{
	let messageBoxPane = document.getElementById("chat"+roomId);
	console.log(roomId);
    let messageCompleteWrapper = document.createElement("div");
    messageCompleteWrapper.classList.add("wrapperSingleMessage");
   

    let messageWrapper = document.createElement("div");
    messageWrapper.classList.add("messageWrapper");

    let pUsername = document.createElement("p");
    pUsername.classList.add("msgUserName");

    //If its an admin message
    if(messageObj.isAdmin){
    	pUsername.innerHTML = "Vous"
    	 messageCompleteWrapper.classList.add("wrapperMsgAdmin");
    }
    else{ //If the message comes from a client
    	 pUsername.innerHTML = username;
    	  messageCompleteWrapper.classList.add("wrapperMsgClient");
    }
   

    let pUserText = document.createElement("p");
    pUserText.classList.add("msgUserText");
    pUserText.innerHTML = messageObj.message;

    messageWrapper.appendChild(pUsername);
    messageWrapper.appendChild(pUserText);
    messageCompleteWrapper.appendChild(messageWrapper);

    messageBoxPane.appendChild(messageCompleteWrapper)
}

//The user is disconnected
function userDisconnected(infos)
{
	let userRoomId = infos.roomId;

	showDisconnectedLabel(userRoomId);
	showUserDisconnectedBanner(userRoomId);
}


//Changes the state of the user in the left bloc
function showDisconnectedLabel(userRoomId)
{
	let singleContact = document.getElementsByClassName("single-contact");

	//Look for the active bar of the contact in the left
	//contact bar
	let disconnectedContactBloc;

	for(let i = 0;i < singleContact.length;i++)
	{
		let roomId;
		roomId = singleContact[i].getAttribute("data-roomId");

		if(roomId == userRoomId){
			disconnectedContactBloc = singleContact[i];
		}
	}

	let activitySpan = disconnectedContactBloc.getElementsByClassName("contact-active")[0]

	activitySpan.classList.remove("contact-ok");
	activitySpan.classList.add("contact-not");

	activitySpan.innerHTML = "Déconnecté";
}


//Shows a user disconnected banner on the user's bloc
function showUserDisconnectedBanner(roomId)
{
	let userPanel = document.getElementById("chat"+roomId);
	let banner = userPanel.getElementsByClassName("eventBanner")[0];
	banner.classList.add("showBanner")
}


let btnCloseConverstation = document.getElementById("btnCloseConverstation");

btnCloseConverstation.addEventListener("click",() =>{
	console.log("closing it!")
	let roomToClose = currentRoomId;
	let modalEmail = document.getElementById("modalEmail");

	$(modalEmail).modal()
})


//Deletes the conversation from the client side
function deleteHTMLConversation(infos)
{
	//Delete the room infos from the JS
	for(let i = 0;i < allConnectedClients.length;i++)
	{
		//If we found the good one
		if(allConnectedClients[i].roomId == infos.roomId)
		{
			allConnectedClients.slice(i,1);
		}
	}

	//Remove the message box panel
	let roomPanel = document.getElementById("chat"+infos.roomId);
	roomPanel.remove();

	//Remove the room from the left contact bar
	let singleContact = document.getElementsByClassName("single-contact");
	let toRemoveContactBloc;

	for(let i = 0;i < singleContact.length;i++)
	{
		let roomId;
		roomId = singleContact[i].getAttribute("data-roomId");

		if(roomId == infos.roomId){
			toRemoveContactBloc = singleContact[i];
		}
	}


	toRemoveContactBloc.remove();
}


//Deletes the conversation and sends a copy 
//by email
function deleteConversation(sendEmail)
{
	socket.emit("deleteConversation",{roomId:currentRoomId,toSocketId:getSocketIdFromRoomId(currentRoomId),sendEmail:sendEmail,sendToEmail: "quebecoisepic@gmail.com"})
	$("#modalEmail").modal("hide");
}

