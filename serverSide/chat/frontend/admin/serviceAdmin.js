
// ChatServiceAdmin

function createConversationServer(me) {
    createSocket();
    launchNotifications();
    
    let customer = Customer();
    let convo = Conversation(ip, me, customer, id);
}


function checkForLongConversation(){
    if (conversation.isLong())
        askToMarkToSave();
}

function askToMarkToSave(){
    
    conversation.markedToSave = confirm("Est-ce que tu veux sauvegarder la conversation ?");
}

function changeCustomerName() {
    customer.name = newName;
}

// Multi-Convo

function onClickConversationTab(clickedConvo){
    
    if (isNotSameConversation(currentConvo, clickedConvo))
    changeConversation();
}

function isNotSameConversation(currentConvo, clickedConvo){
    return currentConvo != clickedConvo;
}

function changeConversation(){}

// Notifications

function launchNotifications(){
    launchAudioNotif();
    launchVisualNotif();
}

function launchAudioNotif(){
    new Audio('/path/to/audio/file.mp3').play(); // TODO : Change file path
}

function launchVisualNotif(){
    // TODO
}