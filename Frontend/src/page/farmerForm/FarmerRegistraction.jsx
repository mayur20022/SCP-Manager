import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Slider';

const FarmerRegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        village: '',
        crops: [],
    });

    const cropOptions = [
        'Wheat', 'Rice', 'Corn', 'Soybean', 'Cotton',
        'Potato', 'Tomato', 'Sugarcane', 'Coffee', 'Tea'
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            let updatedCrops = [...formData.crops];
            if (checked) {
                updatedCrops.push(value);
            } else {
                updatedCrops = updatedCrops.filter(crop => crop !== value);
            }
            setFormData({ ...formData, crops: updatedCrops });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:3000/farmer/register', formData, {
                withCredentials: true
            });
            console.log('Server response:', response.data);
            alert('Registration successful!');
            setFormData({ name: '', phone: '', village: '', crops: [] });

        } catch (error) {
            console.error('Submission error:', error.response?.data || error.message);
            alert('Registration failed. Check console for details.');
        }
    };

    return (
        <div className="flex w-full">
            <Sidebar/>
            <div className="w-full mx-auto rounded-lg shadow-md overflow-hidden mt-10">
               
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Farmer Registration Form</h2>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Personal Details</h3>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1"> Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Village *</label>
                        <input
                            type="text"
                            name="village"
                            value={formData.village}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500"
                            pattern="[0-9]{10}"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Crops Type *</label>
                        <div className="grid grid-cols-2 gap-2">
                            {cropOptions.map((crop) => (
                                <div key={crop} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={crop}
                                        name="crops"
                                        value={crop}
                                        checked={formData.crops.includes(crop)}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-green-600 border-gray-300 rounded"
                                    />
                                    <label htmlFor={crop} className="ml-2 text-sm text-gray-700">{crop}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 w-full flex justify-center">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 rounded-md text-white hover:bg-green-700 focus:ring-green-500"
                        >
                            Submit Registration
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FarmerRegistrationForm;
