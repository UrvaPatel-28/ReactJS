
import './App.css'

import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Join from './component/Join/Join'
import Chat from './component/Chat/Chat'
import Register from './component/Register/Register';
import Login from './component/Login/Login';
import Home from './component/Home/Home';
import Navbar from './component/Navbar/Navbar';
import Count from './component/Count/Count';
import Logout from './component/Logout/Logout';
import { useSelector } from 'react-redux';
import Aboutus from './component/AboutUs/Aboutus';

function App() {
  // const navigate = useNavigate();

  const isLogedIn = useSelector((state: any) => state.auth.token);


  // const ToLogin = <Navigate to="/login" />
  // const ToHome = <Navigate to="/" />

  return (

    <Router>
      <Navbar />
      <Routes >

        <Route path='/' element={<Home />} />
        <Route path='/count' element={<Count />} />
        <Route path='/aboutus' element={<Aboutus />} />
        <Route path='/register' element={<Register />} />
        <Route path='/chat' element={isLogedIn ? <Chat /> : <Navigate to="/login" />} />
        <Route path='/login' element={isLogedIn ? <Navigate to="/" /> : <Login />} />
        {/* <Route path='*' element={<Home />} /> */}
      </Routes>

    </Router >


    // <Router>
    //   <Navbar />
    //   <Routes>
    //     {isLogedIn ?
    //       <>
    //         <Route path='/' element={<Home />} />
    //         <Route path='/chat' element={<Chat />} />
    //         <Route path='/count' element={<Count />} />
    //         <Route path='/aboutus' element={<Aboutus />} />
    //         <Route path='/logout' element={<Logout />} />
    //       </>
    //       :
    //       <>
    //         <Route path='/register' element={<Register />} />
    //         <Route path='/login' element={<Login />} />
    //       </>
    //     }

    //     <Route path='*' element={<Home />} />

    //   </Routes>
    // </Router>


  )
}

export default App
