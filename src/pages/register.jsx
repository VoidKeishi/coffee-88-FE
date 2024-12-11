import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import './register.css'
import API_BASE_URL from '../apiConfig';

export const Register = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.password !== user.confirmPassword) {
            console.error('Passwords do not match');
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}auth/sign-up`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user.email,
                    username: user.username,
                    password: user.password,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                navigate('/personal');
            } else {
                // Handle registration error
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="register-container">
            <div className="register-left"></div>
        <div className="register-right">
          <h1>Welcome to Coffee 88</h1>
                <p>Already have an account? <a href="/login">Log in</a></p>
          <form className="register-form" onSubmit={handleSubmit}>
            <input 
                type="email" 
                placeholder="Email" 
                required 
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input 
                type="text" 
                placeholder="Username" 
                required 
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
                    <div className="password-input">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password" 
                            required 
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                        <span onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                    </div>
                    <div className="password-input">
                        <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder="Confirm Password" 
                            required 
                            value={user.confirmPassword}
                            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                        />
                        <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                    </div>
            <div className="checkbox-container">
              <input type="checkbox" id="subscribe" className="checkbox" />
              <label htmlFor="subscribe">
                I want to receive emails about the product, feature updates, events, and marketing promotions.
              </label>
            </div>
            <button type="submit" className="register-button">Sign Up</button>
            <p>
              By creating an account, you agree to the <a href="/terms">Terms of Use</a> and <a href="/privacy">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>
    );
};

