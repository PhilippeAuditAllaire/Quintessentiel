let clientChat = document.getElementById("clientChat");
let chatTopbar = document.getElementById("chatTopbar");
let isChatWindowOpened = false;
let isConversationEnded = false;
let isConversationStarted = false;

var reText=/^[0-9 a-zàâçéèêëîïôûùüÿñæœ ,.'-]+$/i;
var reEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

let sound = new Audio("./audio/notif.mp3");

//When clicking on the chat topbar
chatTopbar.addEventListener("click", toggleChatWindow)

//Opens or closes the chat window
function toggleChatWindow() {
    if (isChatWindowOpened) { //If the window is opened, close it
        clientChat.classList.remove("opened");
        isChatWindowOpened = false;
    } else { //if the window is closed, open it
        clientChat.classList.add("opened");
        isChatWindowOpened = true;
    }
}

//Connect to the namespace
var socket = io.connect('/client');


//On the start chat button click
let btnStartChat = document.getElementById("btnStartChat");

btnStartChat.addEventListener("click", () => {
	isConversationStarted=true;
    let startInputName = document.getElementById("startInputName").value;
    let startQuestion = document.getElementById("startQuestion").value;

    if (reText.test(startInputName) && reText.test(startQuestion)) {
        socket.emit("startDiscussion", { username: startInputName, question: startQuestion })
        showChatBodyDiscussion();
        isConversationStarted = true;
        document.getElementById("closeChat").style.display = "block";
    }else{
        if(!(reText.test(startInputName))){
            popup("Entrée éronée dans le champs Nom.")
        }
        else if(!(reText.test(startQuestion))){
            popup("Entrée éronée dans le champs Question.")
        }
    }
});

//On the send message button click
let btnSendMessage = document.getElementById("btnChatSendMessage");

btnSendMessage.addEventListener("click", () => {
    sendMessage();
    document.getElementById("sendMessage").focus();
})

$('#sendMessage').on('keypress', function(e) {
    if (e.which === 13) {

        event.preventDefault();
        //Disable textbox to prevent multiple submit
        $(this).attr("disabled", "disabled");
        

        sendMessage();

        //Enable the textbox again if needed.
        $(this).removeAttr("disabled");

        $("#sendMessage").val('');
        document.getElementById("sendMessage").focus();
        console.log($("#sendMessage").val());

    }
});

function sendMessage() {
    if (!isConversationEnded) //If the conversation is still going
    {
        let messageInput = document.getElementById("sendMessage")
        let message = messageInput.value;

        //If the message contains something
        if (message!="") {
            socket.emit("sendMessage", { message: message });
            messageInput.value = "";
        }
    } else { //If it has ended
        popup("La conversation est fermée.")
    }
}

socket.on("incomingMessage", (messageInfos) => {
    displayMessage(messageInfos.message, messageInfos.isAdmin)

    //If the message comes from an admin
    if(messageInfos.isAdmin){
    	sound.play();
    }
    
});

socket.on("discussionAlreadyStarted", (informations) => {
    showChatBodyDiscussion();
    toggleChatWindow();
    addAllInformations(informations);
})

socket.on("conversationEnded", () => {

    socket.emit("conversationEnded");

    let p = document.createElement("p");
    p.classList.add("conversationEndedP")
    p.innerHTML = "La conversation est terminée.";

    isConversationEnded = true;

    chatMessageBox.appendChild(p)
})

//Adds the given informations to the chat window
function addAllInformations(informations) {
    for (let i = 0; i < informations.messages.length; i++) {
        let message = informations.messages[i];
        displayMessage(message.message, message.isAdmin);
    }
}

//Displays a message in the chat window
function displayMessage(message, isAdmin) {
    let chatWindow = document.getElementById("chatMessageBox");

    let divSingleMsg = document.createElement("div");
    divSingleMsg.classList.add("wrapperSingleMessage");


    let msgWrapper = document.createElement("div");
    msgWrapper.classList.add("messageWrapper");

    let pUsername = document.createElement("p");
    pUsername.classList.add("msgUserName");

    //If the message comes from an admin
    if (isAdmin) {
        pUsername.innerHTML = "Admin"
        divSingleMsg.classList.add("wrapperMsgAdmin");
    } else { //If the message comes from the user himself
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

    let chatScroll = document.getElementById("chatMessageBox");
    chatScroll.scrollTop = chatScroll.scrollHeight;
}

//Shows the chat panel instead of the start discussion panel
//on the chat bar
function showChatBodyDiscussion() {
    let chatBodyDiscussion = document.getElementById("chatBodyDiscussion");
    let chatBodyStartDiscussion = document.getElementById("chatBodyStartDiscussion");

    chatBodyStartDiscussion.style.display = "none";
    chatBodyDiscussion.style.display = "block";
}

let emailCopy = document.getElementById("emailCopy");


emailCopy.addEventListener("click", () => {
    let modalEmail = document.getElementById("modalEmail");
    $(modalEmail).modal();
});

//Button that
let btnSendEmail = document.getElementById("btnSendEmail");

btnSendEmail.addEventListener("click", () => {
    let sendEmailValue = document.getElementById("sendEmail").value;

    if (reEmail.test(sendEmailValue)) {
        socket.emit("sendEmailCopy", { email: sendEmailValue })
        popup("Courriel envoyé!");
        $(modalEmail).modal("hide");
    }
    else{
        popup("Adresse courriel non-valide.");
    }

	
});

//Modal To close the chat
let closeChat = document.getElementById("closeChat");

closeChat.addEventListener("click", function(e){
    e.preventDefault();
	let modalCloseChat = document.getElementById("modalCloseChat");
	$(modalCloseChat).modal();
});

//button reset chat
let btnResetChat = document.getElementById("btnResetChat");

btnResetChat.addEventListener("click",() =>{

    resetChat();
	popup("Conversation supprimée!");
	$(modalCloseChat).modal("hide");
});

function resetChat(){
    isConversationStarted=false;
    document.getElementById("chatMessageBox").innerHTML = "";
    document.getElementById("footerChatBox").innerHTML = "";
    socket.emit("closeChat");

    let p = document.createElement("p");
    p.classList.add("conversationEndedP")
    p.innerHTML = "La conversation est terminée. Pour lancer une nouvelle discussion, veuillez recharger la page.";

    isConversationEnded = true;
    document.getElementById("closeChat").style.display = "none";
    document.getElementById("sendMessage").style.display = "none";



    chatMessageBox.appendChild(p)
};