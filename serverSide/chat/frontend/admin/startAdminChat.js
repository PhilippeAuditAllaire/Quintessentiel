const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');


appendMessage('You joined');

function startAdminChat(){

    socket.emit('new-admin', "Quintessentiel");
    
    socket.on('chat-message', data => { onChatMessage(); });
    
    socket.on('user-connected', name => { onUserConnected(name); } );
    
    socket.on('user-disconnected', name => { onUserDisconnected(name); });
    
    
    messageForm.addEventListener('submit', e => { onClickSendMessage(e); });

}

startAdminChat();