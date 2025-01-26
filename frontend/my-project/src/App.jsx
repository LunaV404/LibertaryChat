import React, { useEffect } from 'react'
import Navbar from './Components/Navbar'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import ProfilPage from './Pages/ProfilPage'
import SignupPage from './Pages/SignupPage'
import SettingsPage from './Pages/SettingsPage'
import { useAuthStore } from './store/useAuthStore'
import { LuLoaderCircle } from "react-icons/lu"
import { Navigate } from 'react-router-dom'

const App = () => {


  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log({ authUser })

  if (isCheckingAuth && !authUser) return (
    <div className='"flex items-center justify-center h-screen"'>
      <LuLoaderCircle className="size-10 animate-spin"/>
    </div>
  )

  return (
    <div>

      <Navbar/>

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login"/>}> </Route>
        <Route path="/signup" element={!authUser ? <SignupPage /> : <HomePage />}> </Route>
        <Route path="/login" element={!authUser ? <LoginPage /> : <HomePage />}> </Route>
        <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login"/>}> </Route>
        <Route path="/profile" element={authUser ? <ProfilPage /> : <Navigate to="/login"/>}> </Route>
      </Routes>

    </div>
  )
}

export default App