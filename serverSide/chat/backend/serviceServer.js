
// Functions

function onServerReady() {
    
    io.on('connection', socket => { setupSocket(socket); });
}


function setupSocket(socket){
    
    // Receive
    socket.on(MSG_TYPE.ACTIVE_ADMIN, name => emitAdminConnected() );
    
    socket.on(MSG_TYPE.NEW_ADMIN, name => onAdminConnect(name) );
    
    socket.on(MSG_TYPE.NEW_USER, name => emitUserConnect(name) );
    
    socket.on(MSG_TYPE.SEND_CHAT_MSG, message => emitChatMessage(message) );
    
    socket.on(MSG_TYPE.DISCONNECT, () => emitDisconnect() );
}



function emitAdminConnected(){
    if( admins.length > 0 )
        socket.emit(MsgType.ADMIN_IS_THERE);
    else
        socket.emit(MsgType.ADMIN_IS_MISSING);
}

function onAdminConnect(name){
    // TODO
    admins.push(admin);
}


function emitUserConnect(name, roomId){
    users[socket.id] = name;
    socket.to("Quintessentiel").emit(MsgType.PLZ_JOIN_CUSTO, name, roomId);
}


function emitChatMessage(message){
    socket.broadcast.emit(MsgType.DUDE_SEND_MSG, {
        message: message,
        name: users[socket.id]
    });
}

function emitDisconnect(){
    socket.broadcast.emit(MsgType.DUDE_DISCONNECTED, users[socket.id]);
    delete users[socket.id];
}

