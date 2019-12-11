// Admin Data
var imCustomer = Object.freeze(false);
const currentRoom = null;
var convo = null;
var listConvo = new Map();


io.on('connect', startAdminChat );

appendMessage("Vous êtes connectée en tant qu'admin");

