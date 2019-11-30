const io = require('socket.io')(3000);

const users = {};
const admins = {};

io.on('connection', socket => {
    socket.on('new-user', name => onUserConnect(name) );
    
    socket.on('new-admin', name => onAdminConnect(name) );
    
    socket.on('send-chat-message', message => onSendChatMessage(message) );
    
    socket.on('disconnect', () => onDisconnect() );
});

