
// Server Data

const io = require('socket.io')(3000);

const users = {};
const admins = {};

// Functions

function onServerReady() {
    
    io.on('connection', socket => { setupSocket(socket); });
}

// Enum des types de messages
const MSG_E = Object.freeze({
    "ACTIVE_ADMIN": 1,
    "NEW_ADMIN": 2,
    "NEW_USER": 3,
    "SEND_CHAT_MSG": 4,
    "DISCONNECT": 5
}); // TODO : Remplacer les int par des string plus lisible ?



function setupSocket(socket){
    socket.on(MSG_E.ACTIVE_ADMIN, name => emitAdminConnected() );
    
    socket.on(MSG_E.NEW_ADMIN, name => onAdminConnect(name) );
    
    socket.on(MSG_E.NEW_USER, name => emitUserConnect(name) );
    
    socket.on(MSG_E.SEND_CHAT_MSG, message => emitChatMessage(message) );
    
    socket.on(MSG_E.DISCONNECT, () => emitDisconnect() );
}



function emitAdminConnected(){
    users[socket.id] = admins.length > 0;
    socket.broadcast.emit('admin-connected', name); // TODO : to sender
}

function onAdminConnect(name){
    // TODO
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