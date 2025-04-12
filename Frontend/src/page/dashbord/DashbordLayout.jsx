import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Slider';

export default function DashbordLayout() {
    const [farmers, setFarmers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFarmers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/farmer/farmers', {
                    withCredentials: true,
                });                
                setFarmers(response.data.farmers);
            } catch (err) {
                console.error('Error fetching farmers:', err);
                setError('Failed to load farmers.');
            } finally {
                setLoading(false);
            }
        };

        fetchFarmers();
    }, []);

    return (
        <div className="flex w-full ">
                <Sidebar/>
                
        <div className='w-full  min-h-screen ml-auto py-10 p-7'>
            <h1 className="text-3xl font-bold mb-5">Dashboard</h1>

           

            <div className="mt-10">
                <h3 className="font-bold text-xl mb-4">Farmer List</h3>

                {loading ? (
                    <p>Loading farmers...</p>
                ) : error ? (
                    <p className="text-red-600">{error}</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border">Name</th>
                                    <th className="px-4 py-2 border">Village</th>
                                    <th className="px-4 py-2 border">Crops Types</th>
                                    <th className="px-4 py-2 border">Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {farmers.length > 0 ? (
                                    farmers.map((farmer) => (
                                        <tr key={farmer.id}>
                                            <td className="px-4 py-2 border">{farmer.name}</td>
                                            <td className="px-4 py-2 border">{farmer.village}</td>
                                            <td className="px-4 py-2 border">
                                                {Array.isArray(farmer.crops)
                                                    ? farmer.crops.join(', ')
                                                    : farmer.crops}
                                            </td>
                                            <td className="px-4 py-2 border">{farmer.phone}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-4">
                                            No farmers found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            </div>
        </div>
    );
}
