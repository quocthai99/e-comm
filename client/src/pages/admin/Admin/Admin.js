import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../layouts/Sidebar';

const Admin = () => {
    return (
        <div className="relative">
            <Sidebar />
            <div className="ml-[400px]">
                <Outlet />
            </div>
        </div>
    );
};

export default Admin;
