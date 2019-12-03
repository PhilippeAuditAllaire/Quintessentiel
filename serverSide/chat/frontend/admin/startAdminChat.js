// Admin Data
var imCustomer = Object.freeze(false);
const currentRoom = null;
var convo = null;
var listConvo = new Map();


io.on('connect', startAdminChat );

appendMessage("Vous etes connectée en tant qu'admin");

function startAdminChat(){

    // Send
    socket.emit(MSG_TYPE.NEW_ADMIN, "Quintessentiel");
    
    
    //Receive
    socket.to(currentRoom).on(MSG_TYPE.SEND_CHAT_MSG, data => { onChatMessage(); });
    
    socket.to(currentRoom).on(MSG_TYPE.NEW_USER, name => { onUserConnected(name); } );
    
    socket.to(currentRoom).on(MSG_TYPE.DISCONNECT, name => { onUserDisconnected(name); });
    
    
    messageForm.addEventListener('submit', e => { onClickSendMessage(e); });

}

