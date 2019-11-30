

function onChatMessage(data){
    showNormalMessage(msg);
    
    if (isServerSide)
        checkForLongConversation();
}

function onReceiveClosedConversation() {
    showNotificationMsg("");
}

function onConnectionError(lang) {
    
    showErrorMessage(connectionErrorMsg(lang));
}

function onUserConnected(){
    
    // TODO : join conversation
}

function onUserDisconnected(name){
    showUserDisconnect(name);
}

