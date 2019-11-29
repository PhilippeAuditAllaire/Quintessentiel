// ChatEventHandler


function onOpenChat(){
    showChat();
    autoFirstMessage();
}

function showChat(){
    // TODO
}



function onClickSendMessage() {
    if (messageIsEmpty())
        return;

    if (isFirstMessage())
        createConversation();
}

function onClickMarkToSave() {}

function onClickChangeCustomerName() {}

function onNewConversationRequest() {
    createConversationServer();
}

function onReceiveMessage() {
    showMessage(msg);
    
    if (isServerSide)
        checkForLongConversation();
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

function onReceiveClosedConversation() {
    showNotificationMsg("");
}

function onConnectionError(lang) {
    
    showErrorMessage(connectionErrorMsg(lang));
}