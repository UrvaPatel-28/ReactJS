import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, socket }) {
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);

    useEffect(async () => {
        const data = await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        const response = await axios.post(recieveMessageRoute, {
            from: data._id,
            to: currentChat._id,
        });
        setMessages(response.data);
    }, [currentChat]);

    useEffect(() => {
        const getCurrentChat = async () => {
            if (currentChat) {
                await JSON.parse(
                    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
                )._id;
            }
        };
        getCurrentChat();
    }, [currentChat]);

    const handleSendMsg = async (msg) => {
        const data = await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: data._id,
            msg,
        });
        await axios.post(sendMessageRoute, {
            from: data._id,
            to: currentChat._id,
            message: msg,
        });

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
    }, []);

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="grid grid-rows-[10%,80%,10%] gap-1 overflow-hidden">
            <div className="flex justify-between items-center p-4">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12">
                        <img
                            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                            alt=""
                            className="w-full h-full"
                        />
                    </div>
                    <div className="text-white">
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
                <Logout />
            </div>
            <div className="p-4 flex flex-col gap-4 overflow-auto scrollbar-thin scrollbar-thumb-[#ffffff39]">
                {messages.map((message) => (
                    <div key={uuidv4()} className="relative">
                        <div
                            className={`flex ${message.fromSelf ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div className="max-w-40 overflow-wrap break-word p-4 text-white bg-opacity-39 rounded">
                                <p>{message.message}</p>
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={scrollRef}></div>
            </div>
            <ChatInput handleSendMsg={handleSendMsg} />
        </div>
    );
}
