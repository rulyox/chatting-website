const Response = require('./response');

let chatCounter = 0;

const addChat = (user, text) => {

    chatCounter += 1;

    const chat = {
        id: chatCounter,
        time: getTime(),
        user: user,
        text: text
    };

    // broadcast
    Response.broadcastChat(chat);

};

const getTime = () => {

    const time = new Date();

    const hours = ('0' + time.getHours()).slice(-2);
    const minutes = ('0' + time.getMinutes()).slice(-2);
    const seconds = ('0' + time.getSeconds()).slice(-2);

    return hours + ':' + minutes + ':' + seconds;

};

module.exports = { addChat };
