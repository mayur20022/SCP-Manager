import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Header() {
    const navigate = useNavigate();

    const isLoggedIn = Boolean(Cookies.get('token'));

    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/login');
    };

    return (
        <div className="bg-green-700 text-white p-1">
            <div className="max-w-[1300px] mx-auto flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">SCP </h1>
                    <p className="text-sm opacity-80">Managed Automations</p>
                </div>
                <div className="text-right">
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="text-sm hover:scale-105 px-3 py-2 bg-white text-black rounded-lg"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link to={"/login"} className="text-sm hover:underline">
                            Login to SCP Partner
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
