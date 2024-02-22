import React, { useCallback, useEffect, useMemo, useState } from 'react'
import "./Chat.css";
import socketIo from 'socket.io-client';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import Message from '../Message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import { useParams } from 'react-router-dom';



const Chat = () => {


    const [senderId, setsenderId] = useState();
    const [senderName, setsenderName] = useState();
    const [messages, setMessages] = useState([]);
    // const receiverId = "4e457f3a-6709-4fb8-847e-da045d1d14d5";
    const { receiverId } = useParams();
    const receiverName = "Radhe89"
    // const senderName = decodedData.usernname;
    // const senderId = decodedData.id

    const token = useSelector((state: any) => state.auth.token);
    const decodedData: any = jwtDecode(token);

    const [socket, setSocket] = useState(null)

    // console.log("hii", receiverId);


    useMemo(() => {
        setsenderName(decodedData.username);
        setsenderId(decodedData.id)
    }, [])

    const sendMessage = () => {

        const message = (document.getElementById('chatInput') as HTMLInputElement).value.trim();

        if (message !== '') {
            // Log the sender and receiver IDs
            console.log('Sender ID:', senderId);
            console.log('Receiver ID:', receiverId);

            setMessages(prevMessages =>

                [...prevMessages, { message, senderName, receiverName }]

            );
            // Emit the message to the server
            socket.emit("message", { message, senderName, senderId, receiverId, receiverName });

            // // Save the message to the local state immediately
            console.log(messages);




            // Clear the input field
            (document.getElementById('chatInput') as HTMLInputElement).value = "";
        }
    }

    useEffect(() => {

        const socket = socketIo(`http://${window.location.hostname}:3005`, { transports: ['websocket'] })

        socket.on('connect', () => {
            // socket.emit('connected', { user: senderName })
            console.log('connected');
        })

        socket.emit('joined', { user: senderName, userId: senderId })

        socket.on('welcome', (data) => {
            console.log(data.user, data.message);
        });

        socket.on('userJoined', (data) => {
            console.log(` userJoined ${data.user}, ${data.message}`);
        })

        socket.emit('getMessages', { senderId, receiverId })
        // socket.on('allMessages', (data) => {
        //     console.log(data);

        //     setMessages(data)
        // })


        socket.on('leave', (data) => {
            console.log("discon : ", data.user, data.message);
        })

        setSocket(socket)

        return () => {
            socket.disconnect();
        }
    }, [])



    // useEffect(() => {

    //     socket.on('sendMessage', (data) => {
    //         setMessages([...messages, data]);
    //     });
    //     return () => {
    //         socket.off();
    //     }
    // }, [messages])

    useEffect(() => {

        socket?.on('sendMessage', (data) => {
            console.log(data, receiverId)
            if (data.senderId == receiverId) {
                setMessages([...messages, data]);
            }
        });
        return () => {
            socket?.off();
        }
    }, [messages])


    useEffect(() => {

        socket?.on('allMessages', (data) => {
            console.log(data);

            setMessages(data)
        });

        return () => {
            socket?.off();
        }

    }, [socket])



    return (
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h2>C CHAT</h2>

                </div>
                <ReactScrollToBottom className="chatBox">
                    {
                        messages.map((msg, index) => <Message key={index} message={msg.message} senderName={msg.senderName} receiverName={msg.receiverName} classs={msg.senderName === senderName ? 'right' : 'left'} />)
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
