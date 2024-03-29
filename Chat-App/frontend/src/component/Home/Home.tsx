
import { fetchUserData } from '../../Fetures/userDataSlice';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { UserData } from '../UserList/UserData';
import { jwtDecode } from 'jwt-decode';

interface DecodedData {
    id: string;
    username: string;
}

const Home = () => {

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
            <h1 className='text-2xl font-bold text-center'>Hello {decodedData.username}</h1>
            <input className='border-2 border-blue-950 rounded-md ml-3 py-1 px-2 text-lg text-black' placeholder='Search Username' type="search" name="" id="" value={seachquery} onChange={(e) => setSearchquery(e.target.value)} />
            {result.isLoading ? <h1>Loading...</h1> : <UserData userData={filterData} />}
        </>
    )
}
export default Home
