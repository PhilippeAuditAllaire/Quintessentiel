const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const name = prompt('What is your name?');
appendMessage('You joined');

function startCustomerChat(){

    socket.emit('new-user', name);
    
    socket.on('chat-message', data => { onChatMessage(); });
    
    socket.on('user-connected', name => { onUserConnected(name); } );
    
    socket.on('user-disconnected', name => { onUserDisconnected(name); });
    
    
    messageForm.addEventListener('submit', e => { onClickSendMessage(e); });

}

function createConversationCustomer() {
    createSocket();
    let convo = new Conversation();
}


startCustomerChat();