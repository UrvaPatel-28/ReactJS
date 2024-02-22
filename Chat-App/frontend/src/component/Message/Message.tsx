import React from 'react';
import './Message.css'
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

const Message = ({ message, senderName, receiverName, classs }) => {

    const token = useSelector((state: any) => state.auth.token);
    const decodedData: any = jwtDecode(token);
    const username = decodedData.username;

    if (senderName == username) {
        return (
            <>
                <div className={`messageBox ${classs}`}>

                    {`You: ${message}`}
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <div className={`messageBox ${classs}`}>

                    {`${senderName}: ${message}`}
                </div>
            </>
        )
    }
}

export default Message
