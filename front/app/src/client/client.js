import socketClient from 'socket.io-client';
import config from '../config.json';

const client = socketClient.connect(config.server, {reconnect: true, forceNew: true});

const handleError = (error) => {

    alert('An unexpected error occurred!');
    console.log(error);

};

client.on('connect_error', error => handleError(error));
client.on('connect_failed', error => handleError(error));
client.on('disconnect', error => handleError(error));

export const addListener = (chatListener, alertListener) => {

    client.on('response', (response) => {

        console.log(response);

        const type = response.type;

        if(type === 'chat') chatListener(response.chat);
        else if(type === 'alert') alertListener(response.alert);

    });

};

export const addUser = (name) => {

    client.emit('request', {
        type: 'add',
        name: name
    });

};

export const sendChat = (chat) => {

    client.emit('request', {
        type: 'chat',
        chat: chat
    });

};
