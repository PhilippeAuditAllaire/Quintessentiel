let socket = io.connect('http://localhost:8000/admin');

socket.on("startDiscussion",(data) =>{
	addNewDiscussion(data);
});



//Adds a new discussion to the left
//list
function addNewDiscussion(userInfos)
{
	let contactBar = document.getElementById("contact-bar")

	//Main wrappers
	let li = document.createElement("li");
	let linkTab = document.createElement("a");
	linkTab.href = "#"+userInfos.userUniqueId;
	linkTab.classList.add("single-contact");
	linkTab.setAttribute("data-toggle","tab");
	linkTab.setAttribute("data-userUniqueId",userInfos.userUniqueId);
	linkTab.setAttribute("data-userSocketId",userInfos.socketId);

	
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
	spanActivity.classList.add("contact-ok");

	pActivity.innerHTML = "État: ";
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


    createMessageBox(userInfos.userUniqueId);
}

//Creates the div where all the messages
//of a discussion will be stored
function createMessageBox(userUniqueId){

	let rightBarBody = document.getElementById("rightBarBody");

	let messageBoxWrapper = document.createElement("div");
	messageBoxWrapper.id = userUniqueId;
	messageBoxWrapper.classList.add("tab-pane");
	messageBoxWrapper.classList.add("fade");

	rightBarBody.appendChild(messageBoxWrapper);
}