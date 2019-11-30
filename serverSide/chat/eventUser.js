// ChatEventHandler


function onOpenChat(){
    showChat();
    autoFirstMessage();
}

function onClickSendMessage(e){
    e.preventDefault();
    const message = popMsgFromInput();
    appendMessage(`You: ${message}`);
    emitChatMessage(message);
}

function onPressEnter(){
    // TODO
}

function onClickSendMessage() {
    if (messageIsEmpty())
        return;

    if (isFirstMessage())
        createConversation();
}

function onClickMarkToSave() {
    // TODO
}

function onClickChangeCustomerName() {
    newName = prompt("Quel nom donner a l'utilisateur ?");
    changeUsername(newName);
    appendMessage(previousName + " a ete renommer " + newName);
    // TODO : Change le nom dans le chat
}


function onNewConversationRequest() {
    createConversationServer();
}


function onConversationClosed() {
    sendConvClosed();
    
    if (isServerSide){
        if ( ! conversation.markedToSave)
            askToMarkToSave();
    
        if (conversation.markedToSave)
            saveConversation();
    }
}
