import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import './register.css'
import API_BASE_URL from '../apiConfig';
import { useTranslation } from 'react-i18next';

export const Register = () => {
      const { t } = useTranslation();
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
          <h1>{t('welcomeCoffee88')}</h1>
                <p>{t('alreadyHaveAccount')}? <a href="/login">{t('login')}</a></p>
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
                placeholder={t('username')}
                required 
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
                    <div className="password-input">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder={t('password')}
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
                            placeholder={t('confirmPassword')}
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
              {t('receiveEmails')}</label>
            </div>
            <button type="submit" className="register-button">{t('signUp')}</button>
          
          </form>
        </div>
      </div>
    );
};

