
import { useEffect, useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';



const Register = () => {
    const [userName, setUserName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [hostname, setHostname] = useState('localhost')
    // const [data, setData] = useState<ResponseData>()

    useEffect(() => {
        setHostname(window.location.hostname)
    }, [])

    const navigate = useNavigate()

    const addData = async () => {
        if (!userName || !password || !mobileNumber) {
            return setError("All feilds are required")
        }
        if (loading) {
            return;
        }
        setLoading(true)
        const newData = {
            userName,
            mobileNumber,
            password
        }
        console.log(newData);
        try {
            const response = await fetch(`http://${hostname}:3005/auth/register`, {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),


            });
            console.log("u", response);
            const data = await response.json();
            // setData(data);

            if (data.isError) {
                setError(data.message);
            } else {
                navigate('/login')
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




            <div className="flex justify-center items-center h-screen">
                <div className="w-96 p-8 bg-gray-100 rounded shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Register</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-2 mb-4 border rounded"
                        value={userName} onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                    <input
                        className="w-full p-2 mb-4 border rounded"
                        type="number"
                        placeholder='Mobile number'
                        value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)}

                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 mb-4 border rounded"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        required />

                    {/* <input className='mb-2 p-3' type="file" name='userProfile' /> */}

                    <button type='submit' className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600" onClick={addData} disabled={loading}>Register</button>

                    {loading && <h2>Loading......</h2>}
                    <p>Already have account? <Link to="/login">Login</Link></p>
                    <p className="text-red-700 mt-4" >{error}</p>
                </div>
            </div>
        </>
    );
};

export default Register;
