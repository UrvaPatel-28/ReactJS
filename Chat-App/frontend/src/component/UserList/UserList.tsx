
import { fetchUserData } from '../../Fetures/userDataSlice';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { UserData } from './UserData';
import { jwtDecode } from 'jwt-decode';

interface DecodedData {
    id: string;
    username: string;
}

const UserList = () => {

    const [seachquery, setSearchquery] = useState('');
    const dispatch = useDispatch();

    const result = useSelector((state: any) => state.userData);
    const filterData = result.data.filter((user) => user.userName.toLowerCase().includes(seachquery.toLowerCase()))


    useEffect(() => {
        dispatch(fetchUserData());
        console.log(result.data);
    }, []);

    const token = useSelector((state: any) => state.auth.token);
    const decodedData: DecodedData = jwtDecode(token);

    return (
        <>
            <h1 className=' overflow-scroll text-2xl font-bold'>Hello {decodedData.username}</h1>
            <input className='border-red-200' placeholder='search' type="search" name="" id="" value={seachquery} onChange={(e) => setSearchquery(e.target.value)} />
            {result.isLoading ? <h1>Loading...</h1> : <UserData userData={filterData} />}
        </>
    )
}
export default UserList
