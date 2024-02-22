import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

export default function ChatInput({ handleSendMsg }) {
    const [msg, setMsg] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiPickerhideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = (event, emojiObject) => {
        let message = msg;
        message += emojiObject.emoji;
        setMsg(message);
    };

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg("");
        }
    };

    return (
        <div className="grid items-center grid-cols-[5%,95%] bg-#080420 p-2 sm:gap-4">
            <div className="flex items-center text-white gap-4">
                <div className="relative">
                    <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} className="cursor-pointer text-yellow-500 text-2xl" />
                    {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
                </div>
            </div>
            <form className="w-full flex items-center gap-8 bg-#ffffff34 rounded-full p-2">
                <input
                    type="text"
                    placeholder="type your message here"
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg}
                    className="w-90% h-60% bg-transparent text-white focus:outline-none focus:ring focus:border-blue-300"
                />
                <button type="submit" onClick={(event) => sendChat(event)} className="flex justify-center items-center bg-purple-600 rounded-full p-2 sm:p-1">
                    <IoMdSend className="text-white text-2xl" />
                </button>
            </form>
        </div>
    );
}
