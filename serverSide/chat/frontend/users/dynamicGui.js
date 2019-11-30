
// ChatGuiEditor

function showMessage(msg) {
    console.log(formatMsg(msg));
    // TODO : Show msg in DOM
}

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}


function showErrorMessage(msg) {
    console.log(formatErrorMsg(msg));
    // TODO : Modify DOM
}


function popMsgFromInput(){
    const message = messageInput.value;
    messageInput.value = '';
    return message;
}
