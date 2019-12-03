
// Import : chatt_const.js user_const.js serviceCustomer.js users/*.js

// Customer Data
const imCustomer = Object.freeze(true);
const room = Object.freeze(generateRoomId());
const name = askUserName();


var convo = new Conversation();


io.on('connect', startCustomerChat );

appendMessage(formatFirstMessage());

