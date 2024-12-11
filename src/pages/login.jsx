// src/pages/Login/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import './login.css';
import API_BASE_URL from '../apiConfig';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}auth/sign-in`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            if (response.ok) {
                const data = await response.json();
                navigate('/display');
            } else {
                // Handle login error
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-left"></div>
            <div className="login-right">
                <h1>Login</h1>
                <p className="subtitle">To access your account</p>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        required 
                        value={credentials.email}
                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    />
                    <div className="password-input">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password" 
                            required 
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        />
                        <span onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                    </div>
                    <div className="login-options">
                        <div className="remember-me">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <a href="/forgot-password" className="forgot-password">Forgot your password?</a>
                    </div>
                    <button type="submit" className="login-button">Log In</button>
                    <p className="signup-link">
                        Don't have an account? <a href="/register">Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
