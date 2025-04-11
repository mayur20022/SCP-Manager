import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ScpRegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.phone) {
            newErrors.phone = 'Phone is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Phone must be 10 digits';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

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
            await axios.post('http://localhost:3000/scp/register', formData, {
                withCredentials: true  
            });

            navigate('/dashbord');
        } catch (error) {
            console.error('Registration error:', error);
        }
    };


    return (
        <div className=" bg-gray-50 flex min-h-screen items-center justify-center p-4">
            <div className="max-w-[1000px] w-full bg-white rounded-lg shadow-md overflow-hidden">
               
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 text-center">SC Partner Login</h2>

                    {['name', 'email', 'phone', 'password', 'confirmPassword'].map((field) => (
                        <div key={field}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {field === 'confirmPassword' ? 'Confirm Password *' :
                                    field.charAt(0).toUpperCase() + field.slice(1) + ' *'}
                            </label>
                            <input
                                type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                placeholder={
                                    field === 'phone' ? 'Enter 10 digit phone number' :
                                        field === 'password' ? 'Create a password (min 8 characters)' :
                                            field === 'confirmPassword' ? 'Confirm your password' :
                                                `Enter your ${field}`
                                }
                                className={`w-full px-3 py-2 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                            {errors[field] && <p className="mt-1 text-sm text-red-600">{errors[field]}</p>}
                        </div>
                    ))}
                    <button
                        type="submit"
                        className=" mx-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Register
                    </button>
                </form>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <div className="text-sm text-center text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
                            Login here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScpRegisterPage;
