import React, { useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import "./App.css"
import Home from './pages/Home'
import Appointment from './pages/Appointment'
import About from './pages/About'
import Register from './pages/Register'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import { useContext } from 'react'
import { MyContext } from './main'
import axios from "axios";

const App = () => {
  const {auth, setAuth, setUser} = useContext(MyContext)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/patient/me",
          {
            withCredentials: true,
          }
        );
        setAuth(true);
        setUser(response.data.user);
      } catch (error) {
        setAuth(false);
        setUser({});
      }
    };
    fetchUser();
  }, []);
  console.log(auth)
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/appointment' element={<Appointment/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
        <ToastContainer position='top-center'/>
      </Router>
    </>
  )
}

export default App
