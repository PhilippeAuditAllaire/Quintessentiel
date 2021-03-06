
// ChatGuiEditor

// OUTPUT

function appendMessage(message) {
    console.log(message);
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}

function showNormalMessage(msg) {
    let fmsg = formatMsg(msg);
    appendMessage(fmsg);
}

function showErrorMessage(msg) {
    let fmsg = formatErrorMsg(msg);
    appendMessage(fmsg);
}

function showUserDisconnect(name){
    appendMessage(formatDisconnection(name));
}

function removeIndicatorNewMsg(convo){
    // TODO
}

function putNewMsgIndicator(convo){
    // TODO
}

function showChatOption(){
    // TODO :
}

// INPUT

function popMsgFromInput(){
    const message = messageInput.value;
    messageInput.value = "";
    return message;
}

