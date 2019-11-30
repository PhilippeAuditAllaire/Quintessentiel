// ChatServiceCustomer

function createConversationCustomer() {
    createSocket();
    let convo = new Conversation();
}

function autoFirstMessage(){
    msg = firstMessage(lang);
    console.log(msg);
    showMessage(msg);
    // TODO : Modify Dom
}