import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import './register.css'
export const Register = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add registration logic here
        navigate('/personal');
    };

    return (
        <div className="register-container">
            <div className="register-left"></div>
        <div className="register-right">
          <h1>Welcome to Coffee 88</h1>
                <p>Already have an account? <a href="/login">Log in</a></p>
          <form className="register-form" onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" required />
            <input type="text" placeholder="Username" required />
                    <div className="password-input">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password" 
                            required 
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

  