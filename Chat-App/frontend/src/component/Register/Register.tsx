
import { useEffect, useRef, useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';



const Register = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [hostname, setHostname] = useState('localhost')


    const formRef = useRef<HTMLFormElement>(null)
    console.log(formRef.current);

    useEffect(() => {
        setHostname(window.location.hostname)
    }, [])

    const navigate = useNavigate()

    const addData = async (event: SubmitEvent) => {
        event.preventDefault();
        const formData = new FormData(formRef.current!)
        const { userName, password, mobileNumber } = Object.fromEntries(formData.entries())
        if (!userName || !password || !mobileNumber) {
            return setError("All feilds are required")
        }
        if (loading) {
            return;
        }
        setLoading(true)

        try {
            const response = await fetch(`http://${hostname}:3005/auth/register`, {
                method: 'POST',
                body: formData

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
    // console.log(userProfile);

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <form ref={formRef} action="" onSubmit={addData}>
                    <div className="w-96 p-8 bg-gray-100 rounded shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Register</h2>
                        <input
                            name='userName'
                            type="text"
                            placeholder="Username"
                            className="w-full p-2 mb-4 border rounded"

                            required
                        />
                        <input
                            name='mobileNumber'
                            className="w-full p-2 mb-4 border rounded"
                            type="number"
                            placeholder='Mobile number'


                        />
                        <input
                            name='password'
                            type="password"
                            placeholder="Password"
                            className="w-full p-2 mb-4 border rounded"

                            required />

                        <input className='mb-2 p-3' type="file"

                            name='userProfile' />

                        <button type='submit' className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600" disabled={loading}>Register</button>

                        {loading && <h2>Loading......</h2>}
                        <p>Already have account? <Link to="/login">Login</Link></p>
                        <p className="text-red-700 mt-4" >{error}</p>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Register;

