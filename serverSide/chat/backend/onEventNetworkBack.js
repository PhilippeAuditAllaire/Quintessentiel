
function onUserConnect(name){
    emitUserConnect(name);
}

function onAdminConnect(name){
    // TODO
}


function onSendChatMessage(message){
    emitChatMessage(message);
}


function onDisconnect() {
    emitDisconnect();
}