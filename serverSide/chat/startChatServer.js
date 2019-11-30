const io = require('socket.io')(3000);

const users = {};

io.on('connection', socket => {
    socket.on('new-user', name => onUserConnect(name) );
    
    socket.on('send-chat-message', message => onSendChatMessage(message) );
    
    socket.on('disconnect', () => onDisconnect() );
});

