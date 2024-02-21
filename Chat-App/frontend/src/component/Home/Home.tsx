
import { fetchUserData } from '../../Fetures/userDataSlice';

import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { UserData } from '../UserData/UserData';


const Home = () => {

    // const [username, setUsername] = useState();
    const [seachquery, setSearchquery] = useState('');
    // const [userData, setUserData] = useState([]);
    const dispatch = useDispatch();



    const result = useSelector((state: any) => state.userData);



    const filterData = result.data.filter((user) => user.userName.toLowerCase().includes(seachquery.toLowerCase()))

    // useEffect(() => {
    //     if (result.data.length <= 0) {
    //         dispatch(fetchUserData());
    //     }
    //     setUserData(result.data || []);
    // }, [result]);

    useEffect(() => {
        console.log(result.data);
        dispatch(fetchUserData());
        // setUserData(result.data || []);
        console.log(result.data);

    }, []);

    // const token = useSelector((state: any) => state.auth.token);
    // const decodedData: any = jwtDecode(token);

    return (
        <>

            <h2>This is Home page</h2>
            <input className='border-red-200' placeholder='search' type="search" name="" id="" value={seachquery} onChange={(e) => setSearchquery(e.target.value)} />
            {result.isLoading ? <h1>Loading...</h1> : <UserData userData={filterData} />}

        </>
    )

}
export default Home
