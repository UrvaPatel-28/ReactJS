import React, { useCallback, useEffect, useMemo, useState } from 'react'
// import "./Chat.css";
import socketIo, { type Socket } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import Message from '../Message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import { useParams } from 'react-router-dom';


interface DecodedData {
    id: string;
    username: string;

}

interface Message {
    message: string;
    senderId: string;
    receiverId: string;
    senderName: string;
}

const Chat: React.FC = () => {

    const token = useSelector((state: any) => state.auth.token);
    const decodedData: DecodedData = jwtDecode(token);
    const senderName = decodedData.username;
    const senderId = decodedData.id
    const { receiverId = "" } = useParams<string>();
    // const [senderId, setSenderId] = useState<string>("");
    // const [senderName, setSenderName] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    // const receiverName = "Radhe89";

    const [socket, setSocket] = useState<Socket | null>(null);


    // console.log("hii", receiverId);


    // useMemo(() => {
    //     setSenderName(decodedData.username);
    //     setSenderId(decodedData.id)
    // }, [])

    const sendMessage = () => {
        const messageInput = document.getElementById('chatInput') as HTMLInputElement | null;
        const messageText = messageInput?.value.trim() || '';

        if (messageText !== '') {
            const newMessage: Message = { message: messageText, senderName, senderId, receiverId };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            socket?.emit("message", newMessage);
            messageInput!.value = "";
        }
    };

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


        socket.on('leave', (data) => {
            console.log("discon : ", data.user, data.message);
        })

        setSocket(socket)

        return () => {
            socket.disconnect();
        }
    }, [])



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
        <div className="chatPage bg-gray-100 h-screen flex items-center justify-center">
            <div className="chatContainer bg-white shadow-md rounded-md p-6 w-full max-w-lg">
                <div className="header mb-4">
                    <h2 className="text-2xl font-bold">C CHAT</h2>
                </div>
                <ReactScrollToBottom className="chatBox overflow-y-auto h-64">
                    {messages.map((msg, index) => (
                        <Message key={index} message={msg.message} senderName={msg.senderName} classs={msg.senderId === senderId ? 'right' : 'left'} />
                    ))}
                </ReactScrollToBottom>
                <div className="inputBox mt-4">
                    <input
                        type="text"
                        onKeyPress={(event) => (event.key === 'Enter' ? sendMessage() : null)}
                        id="chatInput"
                        className="border p-2 w-3/4"
                    />
                    <button className="sendBtn ml-2 bg-blue-500 text-white px-4 py-2 rounded" onClick={sendMessage}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}


export default Chat
