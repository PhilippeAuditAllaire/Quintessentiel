
// ChatServiceAdmin

function createConversationServer() {
    createSocket();
    launchNotifications();
}


function checkForLongConversation(){
    if (conversation.isLong())
        askToMarkToSave();
}

function askToMarkToSave(){
    conversation.markedToSave = true;
}


function changeCustomerName() {
    customer.name = newName;
}

function launchNotifications(){
    launchAudioNotif();
    launchVisualNotif();
}

function launchAudioNotif(){
    
}

function launchVisualNotif(){
    
}