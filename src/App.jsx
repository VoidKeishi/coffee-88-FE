import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import { Register } from './pages/register';
import Display from './pages/display';
import ForgotPassword from './pages/forgot-password';
import Personal from './pages/personal';
import Detail from './pages/detail';
import Search from './pages/search';
import './App.css';

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/display" element={<Display />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/personal" element={<Personal />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/" element={<Navigate to="/display" replace />} />
        </Routes>
    );
}

export default App;
