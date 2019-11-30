// ChatNetwork


function emitUserConnect(name){
    users[socket.id] = name;
    socket.broadcast.emit('user-connected', name);
}

function emitChatMessage(message){
    socket.broadcast.emit('chat-message', {
        message: message,
        name: users[socket.id]
    });
}

function emitDisconnect(){
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id];
}




function isAdminConnected() {

}