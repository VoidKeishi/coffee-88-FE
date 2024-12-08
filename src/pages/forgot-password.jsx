import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import './forgot-password.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        setIsEmailSubmitted(true);
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        // Add password reset logic here
        navigate('/login');
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-left"></div>
            <div className="forgot-password-right">
                <h1>Forgot Password</h1>
                <p className="subtitle">Enter your email to reset password</p>
                <form className="forgot-password-form" onSubmit={isEmailSubmitted ? handleResetPassword : handleEmailSubmit}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    
                    {isEmailSubmitted && (
                        <>
                            <div className="password-input">
                                <input 
                                    type={showNewPassword ? "text" : "password"} 
                                    placeholder="New Password" 
                                    required 
                                />
                                <span onClick={() => setShowNewPassword(!showNewPassword)}>
                                    {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </span>
                            </div>
                            <div className="password-input">
                                <input 
                                    type={showConfirmPassword ? "text" : "password"} 
                                    placeholder="Confirm Password" 
                                    required 
                                />
                                <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </span>
                            </div>
                        </>
                    )}
                    
                    <button type="submit" className="submit-button">
                        {isEmailSubmitted ? 'Reset Password' : 'Submit'}
                    </button>
                    
                    <p className="login-link">
                        Remember your password? <a href="/login">Login</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
