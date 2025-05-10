import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import LandingPage from './pages/LandingPage';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';


function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser) {
    return (
      <div className=' flex justify-center items-center h-screen'>
        <Loader className=' size-10 animate-spin' />
      </div>
    )
  }


  return (
    <>

      <div data-theme="synthwave" className="min-h-screen flex flex-col">

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={authUser ? <HomePage /> : <LandingPage />} />
            <Route path="/home" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/signUp" element={!authUser ? <SignUpPage /> : <Navigate to="/home" />} />
            <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/home" />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
          </Routes>
        </AnimatePresence>

        <Toaster />

      </div>
    </>
  )
}

export default App
