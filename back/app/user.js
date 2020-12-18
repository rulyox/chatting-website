const Response = require('./response');

const userList = {};

const addUser = (socketId, name) => {

    userList[socketId] = name;

    // broadcast
    Response.broadcastAlert(`"${name}" joined chat!`);

};

const getUserName = (socketId) => {

    return userList[socketId];

};

module.exports = { addUser, getUserName };
