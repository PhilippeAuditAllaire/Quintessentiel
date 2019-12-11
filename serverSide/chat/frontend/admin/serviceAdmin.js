
// ChatServiceAdmin

function startAdminChat(){

    // Send
    socket.emit(MSG_TYPE.NEW_ADMIN, "Quintessentiel");
    
    
    //Receive
    socket.to(currentRoom).on(MsgType.I_SEND_MSG, data => { onChatMessage(); });
    
    socket.to(currentRoom).on(MsgType.IM_A_NEW_CUSTOMER, name => { onUserConnected(name); } );
    
    socket.to(currentRoom).on(MsgType.I_DISCONNECTED, name => { onUserDisconnected(name); });
    
    
    messageForm.addEventListener('submit', e => { onClickSendMessage(e); });

}



// probably obsolete
function createConversationServer(me) {
    createSocket();
    launchNotifications();
    
    let customer = Customer();
    let convo = Conversation(ip, me, customer, id);
}




// Multi-Convo

function onClickConversationTab(clickedConvo){
    
    if (isNotSameConversation(currentConvo, clickedConvo))
        changeConversation();
}

function isNotSameConversation(currentConvo, clickedConvo){
    return currentConvo != clickedConvo;
}

function changeConversation(){
    // TODO : Decider comment les conversations sont changeable
    // TODO : Enlever l'indicateur de nouveau message
    removeIndicatorNewMsg(currentConvo);
}

// Notifications

function launchNotifications(){
    launchAudioNotif();
    launchVisualNotif();
}

function launchAudioNotif(){
    new Audio('/path/to/audio/file.mp3').play(); // TODO : Change file path
}

function launchVisualNotif(){
    alert("Quelqu'un d'autre s'est connecté au service à la clientèle.");
}


// Optionel

function checkForLongConversation(){
    if (conversation.isLong())
        askToMarkToSave();
}

function askToMarkToSave(){
    
    currentConvo.markedToSave = confirm("Est-ce que tu veux sauvegarder la conversation ?");
}

function changeCustomerName() {
    name = newName;
    //customer.name = newName;
}