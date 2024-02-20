import React from 'react';
import './Message.css'
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

const Message = ({ message, user, classs }) => {

    const token = useSelector((state: any) => state.auth.token);
    const decodedData: any = jwtDecode(token);
    const username = decodedData.username;

    if (user !== username) {
        return (
            <>
                <div className={`messageBox ${classs}`}>

                    {`${user}: ${message}`}
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <div className={`messageBox ${classs}`}>

                    {`You: ${message}`}
                </div>
            </>
        )
    }
}

export default Message
