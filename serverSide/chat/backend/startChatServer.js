
// Server Data

const io = require('socket.io')(3000);

const rooms = {};
const users = {};
const admins = {};

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
    isAdminConnected = admins.length > 0; //TODO
    socket.broadcast.emit('admin-connected', isAdminConnected); // TODO : to sender
}

function onAdminConnect(name){
    // TODO
    admins.push(admin);
}


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



onServerReady();