
// Server Data

const io = require('socket.io')(3000);

const rooms = {};
const users = {};
const admins = {};


onServerReady();