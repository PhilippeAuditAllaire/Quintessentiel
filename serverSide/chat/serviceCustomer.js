// ChatServiceCustomer

function createConversationCustomer() {
    createSocket();
}

function autoFirstMessage(){
    msg = firstMessage(lang);
    console.log(msg);
    showMessage(msg);
    // TODO : Modify Dom
}