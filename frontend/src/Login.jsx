import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import backgroundImage from './assets/carousel3.jpg';
import API_BASE_URL from './config'; // Import your base URL from the configuration file

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_BASE_URL}/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);

                // Store the token in localStorage
                localStorage.setItem('authToken', data.token);

                // Navigate to the home page
                navigate('/home');
            } else {
                const errorData = await response.json();
                setError(errorData.detail || 'Invalid username or password');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div
            className="flex justify-center items-center min-h-screen"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
        >
            <div className="bg-[#F0FFF0] p-8 rounded-lg shadow-lg max-w-md ">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-[#2E8B57]">CarbonIQ</h2>
                    <h3 className="text-2xl mt-2 text-[#3CB371]">Login</h3>
                </div>

                {error && (
                    <div className="text-red-600 text-center mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="username" className="text-[#3CB371] font-semibold text-lg mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            className="p-3 rounded-lg border-2 border-[#8FBC8F] focus:outline-none focus:border-[#2E8B57] text-green-900"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-[#3CB371] font-semibold text-lg mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="p-3 rounded-lg border-2 border-[#8FBC8F] focus:outline-none focus:border-[#2E8B57] w-full text-green-900"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePassword}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8FBC8F] focus:outline-none"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 bg-[#3CB371] text-white rounded-lg font-semibold hover:bg-[#2E8B57] transition"
                    >
                        Login
                    </button>
                </form>

                <div className="text-center mt-4 text-[#2E8B57]">
                    <Link to="/forgot-password" className="hover:underline">Forgot Password?</Link>
                </div>
                <div className="text-center mt-2 text-[#2E8B57]">
                    <p className="text-[rgb(0,100,0)]">
                        Don't have an account?{' '}
                        <Link to="/register" className="hover:underline">Register here</Link>
                    </p>
                </div>
                <div className="text-center mt-2 text-[#2E8B57]">
                    <p><Link to="/" className="hover:underline">Back Home</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
