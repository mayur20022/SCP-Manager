import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export const RequireAuth = ({ children }) => {
    const [authChecked, setAuthChecked] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const response = await axios.get('https://scp-manager.onrender.com/scp/verify', {
                    withCredentials: true, 
                });

                if (response.status === 200 && response.data?.userId) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (err) {
                setIsAuthenticated(false);
            } finally {
                setAuthChecked(true);
            }
        };

        verifyAuth();
    }, []);

    if (!authChecked) {
        return <div className="text-center py-10">Verifying access...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};
