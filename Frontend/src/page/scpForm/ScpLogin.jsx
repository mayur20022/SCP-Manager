import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ScpLogin = () => {
    
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors((prev) => ({ ...prev, [name]: '' }));
        setServerError('');
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:3000/scp/login',
                formData,
                { withCredentials: true }
            );

            navigate('/dashboard');
        } catch (error) {
            console.error('❌ Login error:', error);
            if (error.response?.status === 401) {
                setServerError('Invalid email or password.');
            } else {
                setServerError('Something went wrong. Try again later.');
            }
        }
    };

    return (
        <div className="bg-gray-50 flex items-center justify-center min-h-screen p-4">
            <div className="max-w-[1200px] mx-auto w-full bg-white rounded-lg shadow-md overflow-hidden">
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 text-center">SC Partner Login</h2>

                    {serverError && <p className="text-red-600 text-sm text-center">{serverError}</p>}

                    {['email', 'password'].map((field) => (
                        <div key={field}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {field.charAt(0).toUpperCase() + field.slice(1)} *
                            </label>
                            <input
                                type={field === 'password' ? 'password' : 'email'}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                placeholder={`Enter your ${field}`}
                                className={`w-full px-3 py-2 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                            {errors[field] && <p className="mt-1 text-sm text-red-600">{errors[field]}</p>}
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="mx-auto py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Login
                    </button>
                </form>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-sm text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/" className="font-medium text-green-600 hover:text-green-500">
                        Register here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ScpLogin;
