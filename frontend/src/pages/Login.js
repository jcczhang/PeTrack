import React, { useState } from 'react';
import '../styles/Login.css';
import loginImage from '../assets/images/login.jpg';


function Login() {
    const [isSignUpActive, setIsSignUpActive] = useState(false);

    const handleSignUpClick = () => {
        setIsSignUpActive(true);
    };

    const handleSignInClick = () => {
        setIsSignUpActive(false);
    };

    return (
        <div className={`container ${isSignUpActive ? 'active' : ''}`}>
            <div className="form-container signin-container">
                <form>
                    <h1>Login</h1>
                    <div className="social-container">
                        <a href="#" className="social"><i>1</i></a>
                        <a href="#" className="social"><i>2</i></a>
                        <a href="#" className="social"><i>3</i></a>
                    </div>
                    <p>or use your account</p>
                    <div className="form-group">
                        <input type="email" required />
                        <label>Email</label>
                    </div>
                    <div className="form-group">
                        <input type="password" required />
                        <label>Password</label>
                    </div>
                    <a href="#" className="forgot-password">Forgot Password?</a>
                    <button className="btn" type="submit">Login</button>
                </form>
            </div>

            <div className="form-container signup-container">
                <form>
                    <h1>Register</h1>
                    <div className="social-container">
                        <a href="#" className="social"><i>1</i></a>
                        <a href="#" className="social"><i>2</i></a>
                        <a href="#" className="social"><i>3</i></a>
                    </div>
                    <p>or use email to register</p>
                    <div className="form-group">
                        <input type="text" required />
                        <label>username</label>
                    </div>
                    <div className="form-group">
                        <input type="email" required />
                        <label>email</label>
                    </div>
                    <div className="form-group">
                        <input type="password" required />
                        <label>password</label>
                    </div>
                    <button className="btn" type="submit">register</button>
                </form>
            </div>

            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>Please log in to your account</p>
                        <button className="btn btn-ghost" onClick={handleSignInClick}>Login</button>
                    </div>
                        <div
                            className="overlay-panel overlay-right"
                            style={{
                                backgroundImage: `url(${loginImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: 'transparent',

                                color: 'white', 
                            }}
                        >
                            <h1>Hello!</h1>
                            <p>Enter your information to register an account</p>
                            <button className="btn btn-ghost" onClick={handleSignUpClick}>register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
