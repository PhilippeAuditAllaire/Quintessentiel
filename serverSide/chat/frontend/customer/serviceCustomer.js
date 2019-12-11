function askUserName(){
    var name = prompt(formatAskName());
    while (name == "Quintessentiel"){
        name = prompt(formatAskName());
    }
    return name;
}

function generateRoomId(){
    const NBR_CHAR_ROOM = 15;
    return (Math.random() + 1).toString(36).substr(2, NBR_CHAR_ROOM);
}


function startCustomerChat(){
    
    socket.join(room);

    // Send
    socket.emit(MsgType.IM_A_NEW_CUSTOMER, name);
    
    // Receive
    socket.to(room).on(MsgType.DUDE_SEND_MSG, () => { onChatMessage(); });
    
    socket.to(room).on(MsgType.DUDE_DISCONNECTED, name => { onUserDisconnected(name); });
    
    socket.to(room).on(MsgType.ADMIN_IS_MISSING, () => { onAdminIsMissing(); });
    
    socket.to(room).on(MsgType.ADMIN_IS_THERE, () => { onAdminIsThere(); });
    
    messageForm.addEventListener('submit', e => { onClickSendMessage(e); });

}

