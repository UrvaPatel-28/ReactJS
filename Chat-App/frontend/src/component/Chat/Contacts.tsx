import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, changeChat }) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(async () => {
        const data = await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        setCurrentUserName(data.username);
        setCurrentUserImage(data.avatarImage);
    }, []);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };

    return (
        <>
            {currentUserImage && currentUserImage && (
                <div className="grid grid-rows-[10%,75%,15%] overflow-hidden bg-#080420">
                    <div className="flex items-center justify-center gap-4">
                        <img src={Logo} alt="logo" className="h-8" />
                        <h3 className="text-white uppercase">snappy</h3>
                    </div>
                    <div className="flex flex-col items-center overflow-auto scrollbar-thin scrollbar-thumb-[#ffffff39] gap-2.5">
                        {contacts.map((contact, index) => (
                            <div
                                key={contact._id}
                                className={`bg-#ffffff34 min-h-20 cursor-pointer w-90% rounded-0.2rem p-2 flex items-center gap-4 transition duration-500 ease-in-out ${index === currentSelected ? "bg-#9a86f3" : ""
                                    }`}
                                onClick={() => changeCurrentChat(index, contact)}
                            >
                                <div className="avatar">
                                    <img
                                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                        alt=""
                                        className="h-12"
                                    />
                                </div>
                                <div className="username">
                                    <h3 className="text-white">{contact.username}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center items-center gap-8 bg-#0d0d30">
                        <div className="avatar">
                            <img
                                src={`data:image/svg+xml;base64,${currentUserImage}`}
                                alt="avatar"
                                className="h-16 max-w-full"
                            />
                        </div>
                        <div className="username">
                            <h2 className="text-white">{currentUserName}</h2>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
