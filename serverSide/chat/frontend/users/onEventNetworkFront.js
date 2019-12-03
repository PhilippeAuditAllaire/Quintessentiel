

function onChatMessage(data){
    showNormalMessage(msg);
    putNewMsgIndicator();
    
    if ( ! imCustomer){
        checkForLongConversation();
    }
}


function onConnectionError(lang) { // Obsolete ?
    
    showErrorMessage(connectionErrorMsg(lang));
}

function onUserConnected(){
    
    // TODO : join conversation
}

function onUserDisconnected(name){
    showUserDisconnect(name);
}

function onAdminIsThere(){
    // TODO : Start conversation ?
    showChatOption();
}

function onAdminIsMissing(){
    // Dont show chat invite
    io.on('disconnect', onConnect); // TODO : A tester
}