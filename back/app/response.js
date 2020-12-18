const listeningSockets = {};

const sendMessage = (socket, message) => {

    socket.emit('response', {
        type: 'message',
        message: message
    });

};

const sendChat = (socket, chat) => {

    socket.emit('response', {
        type: 'chat',
        chat: chat
    });

};

const sendAlert = (socket, alert) => {

    socket.emit('response', {
        type: 'alert',
        alert: alert
    });

};

const addListener = (socketId, socket) => {

    listeningSockets[socketId] = socket;

};

const broadcastChat = (chat) => {

    // to all sockets
    for(const socket of Object.values(listeningSockets)) sendChat(socket, chat);

};

const broadcastAlert = (alert) => {

    // to all sockets
    for(const socket of Object.values(listeningSockets)) sendAlert(socket, alert);

};

module.exports = { sendMessage, addListener, broadcastChat, broadcastAlert };
