import React from 'react';
import './Message.css'
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

interface MessageProps {
    message: string;
    senderName: string;
    classs: string;
}
interface DecodedData {
    id: string;
    username: string;
}

const Message: React.FC<MessageProps> = ({ message, senderName, classs }) => {

    const token = useSelector((state: any) => state.auth.token);
    const decodedData: DecodedData = jwtDecode(token);
    const userName: string = decodedData.username;

    if (senderName == userName) {
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
