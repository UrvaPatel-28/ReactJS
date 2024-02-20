import React, { useCallback, useEffect, useMemo, useState } from 'react'
import "./Chat.css";
import socketIo from 'socket.io-client';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import Message from '../Message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom';


const Chat = () => {

    const socket = socketIo(`http://${window.location.hostname}:3005`, { transports: ['websocket'] })

    const [userId, setuserId] = useState();
    const [username, setUsername] = useState();
    const [messages, setMessages] = useState(['hii'])

    const token = useSelector((state: any) => state.auth.token);
    const decodedData: any = jwtDecode(token);

    useMemo(() => {
        setUsername(decodedData.username);
        setuserId(decodedData.id)
    }, [])

    const sendMessage = () => {
        const message = (document.getElementById('chatInput') as HTMLInputElement).value;
        socket.emit("message", { message, username, userId });
        (document.getElementById('chatInput') as HTMLInputElement).value = ""
    }




    useEffect(() => {

        socket.on('connect', () => {
            console.log('connected');
        })

        socket.emit('joined', { user: username })

        socket.on('welcome', (data) => {
            console.log(data.user, data.message);
        });

        socket.on('userJoined', (data) => {
            console.log(` userJoined ${data.user}, ${data.message}`);
        })

        socket.emit('getMessages', "urva patel")
        socket.on('sendMessages', (data) => {
            console.log(data);

            setMessages(data)
        })


        socket.on('leave', (data) => {
            console.log("discon : ", data.user, data.message);
        })


        return () => {
            socket.disconnect();
        }
    }, [])

    useEffect(() => {

        socket.on('sendMessage', (data) => {
            setMessages([...messages, data]);
        });
        return () => {
            socket.off();
        }
    }, [messages])




    return (
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h2>C CHAT</h2>

                </div>
                <ReactScrollToBottom className="chatBox">
                    {
                        messages.map((msg, index) => <Message key={index} message={msg.message} user={msg.username} classs={msg.username === username ? 'right' : 'left'} />)
                    }
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input type="text" onKeyPress={(event) => event.key === 'Enter' ? sendMessage() : null} id='chatInput' />
                    <button className='sendBtn' onClick={sendMessage}>Send</button>
                </div>

            </div>

        </div>
    )
}


export default Chat
