import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="flex border">
            <div className="w-64 bg-green-700 pt-10 text-white h-full p-4">
                <ul>
                        <Link to={"/dashboard"} > 
                    <li className="mb-4 hover:bg-green-400 p-2 rounded-lg text-center">
                            Dashboard
                    </li>
                        </Link>
                        <Link to={"/dashboard/farmer-register"} >
                    <li className="mb-4 hover:bg-green-400 p-2 rounded-lg text-center">
                            Register Farmer
                    </li>
                        </Link>
                </ul>
            </div>
           
        </div>
    );
};

export default Sidebar;
