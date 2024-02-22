
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';



export function UserData({ userData }) {
    // const [hostName, setHostName] = useState('localhost')
    const hostName = window.location.hostname;

    const navigate = useNavigate();

    const handleClick = (receiverId) => {
        console.log("hi", receiverId);

        // setUserName(username);
        navigate(`/chat/${receiverId}`);
    }


    // useEffect(() => {
    //     setHostName(window.location.hostname)
    // }, [])

    return (
        <>
            {userData.length > 0 ?
                <table className='table-auto border-2'>

                    <thead >
                        <tr >
                            <th>UserName</th>
                            <th>MobileNumber</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            userData.map((user) => {
                                // console.log(user);
                                return (
                                    <tr className='border-4 cursor-pointer' onClick={() => handleClick(user.id)} key={user.id} >

                                        <td  >{user.userName}</td>
                                        <td>{user.mobileNumber}</td>
                                        <td>
                                            <img className="h-20 w-20 object-contain rounded-full" src={`http://${hostName}:3005/${user.userProfile}`} />
                                        </td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table >
                : null
            }

        </>
    )
}
