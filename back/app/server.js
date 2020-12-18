const socketIO = require('socket.io');
const Chat = require('./chat');
const User = require('./user');
const Response = require('./response');

socketIO.listen(8080).on('connection', (socket) => {

    // initial connection message
    Response.sendMessage(socket, 'Connected');

    socket.on('request', (request) => {

        const socketId = socket.id;
        const type = request.type;

        if(type === 'add') { // user add

            const name = request.name;

            User.addUser(socketId, name);

            Response.addListener(socketId, socket);

            const message = `User Added : ${name}`;
            console.log(message);
            Response.sendMessage(socket, message);

        } else if(type === 'chat') { // send chat

            const user = User.getUserName(socketId);
            const chat = request.chat;

            if(user === undefined) {

                Response.sendMessage(socket, 'User does not exist!');

            } else {

                Chat.addChat(user, chat);

                const message = `Chat : ${user} : ${chat}`;
                console.log(message);

            }

        } else { // wrong request

            Response.sendMessage(socket, 'Wrong request!');

        }

    });

});
