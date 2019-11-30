
function onReceiveMessage() {
    showMessage(msg);
    
    if (isServerSide)
        checkForLongConversation();
}

function onReceiveClosedConversation() {
    showNotificationMsg("");
}

function onConnectionError(lang) {
    
    showErrorMessage(connectionErrorMsg(lang));
}


function onChatMessage(data){
    appendMessage(`${data.name}: ${data.message}`);
}

function onUserConnected(){
    appendMessage(`${name} connected`);
}

function onUserDisconnected(name){
    appendMessage(`${name} disconnected`);
}

function onUserConnect(name){
    emitUserConnect(name);
}


function onSendChatMessage(message){
    emitChatMessage(message);
}


function onDisconnect() {
    emitDisconnect();
}