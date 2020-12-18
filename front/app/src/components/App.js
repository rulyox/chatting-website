import React, { useState, useEffect } from 'react';
import './App.css';

import Chat from './chat/Chat';
import Alert from './alert/Alert';
import * as client from '../client/client';

const App = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [text, setText] = useState('');
    const [chatList, setChatList] = useState([]);

    // init listeners
    useEffect(() => {

        const scrollToBottom = () => {
            const chatListElement = document.getElementById('app__chat-list');
            chatListElement.scrollTop = chatListElement.scrollHeight;
        };

        const chatListener = (chat) => {

            const chatElement = <Chat key={chat.id}
                                      time={chat.time}
                                      user={chat.user}
                                      text={chat.text} />;

            setChatList(chatList => [...chatList, chatElement]);

            scrollToBottom();

        };

        const alertListener = (alert) => {

            const alertElement = <Alert key={alert}
                                        alert={alert} />;

            setChatList(chatList => [...chatList, alertElement]);

            scrollToBottom();

        };

        client.addListener(chatListener, alertListener);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const clickAddUser = () => {

        if(userName === '') {
            alert('User Name should not be empty!');
            return;
        }

        client.addUser(userName);

        setLoggedIn(true);

    };

    const clickSend = () => {

        if(text === '') {
            alert('Chat should not be empty!');
            return;
        }

        client.sendChat(text);

        setText('');

    };

    const keyboardListener = (event, action) => {
        if (event.key === 'Enter') action();
    };

    return (
        <div id="app">

            <div id="app__title">Chatting Website</div>

            {
                // before login
                !loggedIn &&
                <div id="app__name-container">

                    <div className="input-group">

                        <div className="input-group-prepend">
                            <span className="input-group-text">User Name</span>
                        </div>

                        <input type="text" className="form-control"
                               value={userName}
                               onChange={(e) => setUserName(e.target.value)}
                               onKeyDown={(event) => keyboardListener(event, clickAddUser)} />

                        <div className="input-group-append">
                            <button className="btn btn-primary" type="submit"
                                    onClick={clickAddUser}>Enter!</button>
                        </div>

                    </div>

                </div>
            }

            {
                // after login
                loggedIn &&
                <div id="app__chat-container">

                    <div id="app__chat-name">
                        Your Name : {userName}
                    </div>

                    <div id="app__chat-list">
                        {chatList}
                    </div>

                    <div className="input-group">

                        <input type="text" className="form-control"
                               value={text}
                               onChange={(e) => setText(e.target.value)}
                               onKeyDown={(event) => keyboardListener(event, clickSend)} />

                        <div className="input-group-append">
                            <button className="btn btn-primary" type="submit"
                                    onClick={clickSend}>Send!</button>
                        </div>

                    </div>

                </div>
            }

        </div>
    );
};

export default App;
