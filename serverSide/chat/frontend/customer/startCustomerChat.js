
// Import : chatt_const.js user_const.js users/*

// Customer Data
var imCustomer = Object.freeze(true);
const room = Object.freeze(generateRoomId());
const name = prompt(formatAskName());
var convo = new Conversation();


io.on('connect', startCustomerChat );

appendMessage(formatFirstMessage());


function generateRoomId(){
    const NBR_CHAR_ROOM = 15;
    return (Math.random() + 1).toString(36).substr(2, NBR_CHAR_ROOM);
}


function startCustomerChat(){
    
    socket.join(room);

    // Send
    socket.emit('new-user', name);
    
    // Receive
    socket.to(room).on(MSG_TYPE.SEND_CHAT_MSG, data => { onChatMessage(); });
    
    socket.to(room).on(MSG_TYPE.NEW_USER, name => { onUserConnected(name); } );
    
    socket.to(room).on(MSG_TYPE.DISCONNECT, name => { onUserDisconnected(name); });
    
    
    messageForm.addEventListener('submit', e => { onClickSendMessage(e); });

}

