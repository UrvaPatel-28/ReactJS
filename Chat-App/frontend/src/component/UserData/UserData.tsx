
import { Link, useNavigate } from 'react-router-dom';



export function UserData({ userData }) {


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
                                    <tr className='border-4 cursor-pointer' key={user.id} >

                                        <td  >{user.userName}</td>
                                        <td>{user.mobileNumber}</td>

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
