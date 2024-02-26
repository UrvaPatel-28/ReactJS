
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Chat from '../Chat/Chat';


interface User {
    id: string;
    userName: string;
    mobileNumber: string;
    userProfile: string;
}

interface UserDataProps {
    userData: User[];
}

export function UserData({ userData }: UserDataProps) {
    // const [hostName, setHostName] = useState('localhost')
    const hostName = window.location.hostname;

    const [showSecondComponent, setShowSecondComponent] = useState(false);
    const [receiverId, setReceiverId] = useState("b0dbce89-1707-4a95-a9c1-94c3adb24249")
    const [receiverName, setReceiverName] = useState("Urva")
    const [receiverProfile, setReceiverProfile] = useState("userprofile")

    const navigate = useNavigate();

    const handleClick = (receiver: User) => {
        setReceiverName(receiver.userName)
        setReceiverId(receiver.id);
        setReceiverProfile(receiver.userProfile)
        setShowSecondComponent(true);
        console.log("kkk");

        // setUserName(username);
        // navigate(`/chat/${receiverId}`);
    }


    console.log("receibverID", receiverId);


    return (
        <>
            <div className="container flex p-7">

                <div className="list w-1/3 h-full  overflow-y-auto ">

                    {userData.length > 0 ?
                        <table className='table-auto '>

                            <thead >
                                <tr >
                                    <th>UserName</th>
                                    <th>MobileNumber</th>
                                    <th>Image</th>

                                </tr>
                            </thead>
                            <tbody className=''>
                                {
                                    userData.map((user) => {
                                        // console.log(user);
                                        return (
                                            <tr className='cursor-pointer   ' onClick={() => handleClick(user)} key={user.id} >

                                                <td className='' >{user.userName}</td>
                                                <td>{user.mobileNumber}</td>
                                                <td>
                                                    <img className="h-14 w-14  border-2 border-red-600 object-contain rounded-full m-2" src={`http://${hostName}:3005/${user.userProfile}`} />
                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table >
                        : null
                    }
                </div>
                <div className="chat w-2/3 ">
                    {showSecondComponent ? <Chat receiverId={receiverId} receiverName={receiverName} receiverProfile={receiverProfile} /> :
                        <h1 className='text-3xl flex items-center justify-center h-full '>
                            Select user to start chat
                        </h1>
                    }

                </div>
            </div>
        </>
    )
}
