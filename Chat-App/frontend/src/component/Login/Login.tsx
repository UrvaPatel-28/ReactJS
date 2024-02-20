
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../Fetures/authSlice';


const Login = () => {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)

    const [hostname, setHostname] = useState('localhost')

    useEffect(() => {
        setHostname(window.location.hostname)
    }, [])

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const addData = async () => {
        if (!userName || !password) {
            return setError("All feilds are required")
        }
        if (loading) {
            return;
        }

        setLoading(true)
        const newData = {
            userName,
            password
        }

        try {
            const response = await fetch(`http://${hostname}:3005/auth/login`, {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });
            const data = await response.json();

            // setData(data)
            if (data.isError) {
                setError(data.message);
            } else {
                //send token in slice
                dispatch(login(data.data.token));
                navigate('/')
            }
            console.log("data", data);
        } catch (error) {
            console.error('Error adding data', error);
        } finally {
            setLoading(false)
        }
    }
    return (
        <>


            <div className="flex justify-center items-center h-screen" >
                <div className="w-96 p-8 bg-gray-100 rounded shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Login</h2>
                    <input

                        type="text" value={userName} onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <input

                        type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <button type='submit' className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600" onClick={addData}>Login</button>
                    <p>Create a new account? <Link to="/register">Register</Link></p>

                    {loading && <h2>Loading......</h2>}

                    <p className="text-red-700 mt-4" >{error}</p>
                </div>
            </div >

        </>
    );
};

export default Login;
