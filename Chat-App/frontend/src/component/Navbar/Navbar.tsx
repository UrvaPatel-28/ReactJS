import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { logout } from '../../Fetures/authSlice';

const Navbar = () => {


    const isLoIn = useSelector((state: any) => state.auth.token);
    const dispatch = useDispatch()

    return (
        <>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white text-xl font-semibold">Chat App</div>


                    {isLoIn ?
                        <div className="space-x-4">
                            <NavLink to="/" className="text-white hover:text-gray-300" >
                                Home
                            </NavLink>

                            <NavLink to="/aboutus" className="text-white hover:text-gray-300"  >
                                About Us
                            </NavLink>

                            <NavLink to="/chat" className="text-white hover:text-gray-300" >
                                Chat
                            </NavLink>

                            <NavLink to="/contact" className="text-white hover:text-gray-300" >
                                Contact
                            </NavLink>

                            <NavLink onClick={() => dispatch(logout())} to="/login" className="text-white hover:text-gray-300" >
                                Logout
                                {/* <Button>Login</Button> */}
                            </NavLink>
                        </div>
                        :
                        <div className="space-x-4">
                            <NavLink to="/login" className="text-white hover:text-gray-300" >
                                Login
                            </NavLink>

                            <NavLink to="/register" className="text-white hover:text-gray-300"  >
                                Register
                            </NavLink>
                        </div>
                    }
                </div>
            </nav>
        </>
    )
}

export default Navbar
