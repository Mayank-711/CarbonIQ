import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from './assets/carousel3.jpg'; // Adjust the path as needed
import API_BASE_URL from './config';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errorMessage, setErrorMessage] = useState(''); // Add errorMessage state
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Password mismatch check
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match!"); // Show error message
            return;
        }
    
        try {
            const response = await fetch(`${API_BASE_URL}/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                }),
            });
    
            if (response.ok) {
                setSuccessMessage("Registration successful! Redirecting to login...");
                setErrorMessage(''); // Clear any error messages
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
    
                setTimeout(() => {
                    navigate("/login"); // Redirect to login page after 2 seconds
                }, 2000);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.detail || "Failed to register");
                setSuccessMessage(''); // Clear success message if error occurs
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setErrorMessage("An error occurred. Please try again.");
            setSuccessMessage(''); // Clear success message on error
        }
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
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
            <div className="bg-[#F0FFF0] text-white p-6 rounded-lg shadow-lg w-[350px] h-auto">
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-[#2E8B57]">CarbonIQ</h2>
                    <h3 className="text-xl mt-2 text-[#3CB371]">Register</h3>
                    {successMessage && (
                        <p className="mt-2 text-green-500 text-sm animate-fade-in">{successMessage}</p>
                    )}
                    {/* Display error message */}
                    {errorMessage && (
                        <p className="mt-2 text-red-500 text-sm animate-fade-in">{errorMessage}</p>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Username Field */}
                    <div className="flex flex-col">
                        <label htmlFor="username" className="text-[#3CB371] font-semibold text-md mb-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            className="p-2 rounded-lg border-2 border-[#8FBC8F] focus:outline-none focus:border-[#2E8B57] text-green-900 text-sm"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-[#3CB371] font-semibold text-md mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="p-2 rounded-lg border-2 border-[#8FBC8F] focus:outline-none focus:border-[#2E8B57] text-green-900 text-sm"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-[#3CB371] font-semibold text-md mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="p-2 rounded-lg border-2 border-[#8FBC8F] focus:outline-none focus:border-[#2E8B57] w-full text-green-900 text-sm"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePassword}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8FBC8F] focus:outline-none"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="flex flex-col">
                        <label htmlFor="confirmPassword" className="text-[#3CB371] font-semibold text-md mb-1">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                className="p-2 rounded-lg border-2 border-[#8FBC8F] focus:outline-none focus:border-[#2E8B57] w-full text-green-900 text-sm"
                                required
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPassword}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8FBC8F] focus:outline-none"
                            >
                                {showConfirmPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full p-2 bg-[#3CB371] text-white rounded-lg font-semibold hover:bg-[#2E8B57] transition"
                    >
                        Register
                    </button>
                </form>

                {/* Already have an account */}
                <div className="text-center mt-4 text-[rgb(0,100,0)] text-sm">
                    <p>Already have an account?
                        <Link to="/login" className="hover:underline text-[#2E8B57]"> Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
