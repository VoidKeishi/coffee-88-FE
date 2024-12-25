import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import { Register } from './pages/register';
import Display from './pages/display';
import ForgotPassword from './pages/forgot-password';
import Personal from './pages/personal';
import Detail from './pages/detail';
import Search from './pages/search';
import Favorite from './pages/favorite';
import './App.css';
import './i18n'; 
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/display" element={<Display />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/personal" element={<Personal />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/search" element={<Search />} />
                <Route path="/favorite" element={<Favorite />} />
                <Route path="/" element={<Navigate to="/display" replace />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;