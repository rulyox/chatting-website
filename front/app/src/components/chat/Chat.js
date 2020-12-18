import React from 'react';
import './Chat.css';

const Chat = ({ time, user, text }) => {

    return (
        <div className="chat">
            <div className="chat__time">{time}</div>
            <div className="chat__content">
                <div className="chat__user">{user}</div>
                <div className="chat__text">{text}</div>
            </div>
        </div>
    );

};

export default Chat;
