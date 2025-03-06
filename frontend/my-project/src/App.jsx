import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ProfilePage from './pages/ProfilePage'
import Settings from './pages/Settings'
import { useAuthStore } from './store/useAuthStore'
import { FaSpinner } from "react-icons/fa";
import { Toaster } from "react-hot-toast"


const App = () => {

  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

  useEffect(() => {checkAuth()}, [checkAuth]);

  console.log({authUser});

  if (isCheckingAuth && !authUser) return (
    <div className='h-screen w-screen flex items-center'>
      <FaSpinner className='size-16 animate-spin m-auto'/>
    </div>
  )

  return (
    <div>
        <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/signup" />}></Route>
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/"/>}></Route>
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/"/>}></Route>
        <Route path="/profile" element={<ProfilePage/>}></Route>
        <Route path="/settings" element={<Settings />}></Route>
      </Routes>

      <Toaster />
    </div>
  )
}

export default App