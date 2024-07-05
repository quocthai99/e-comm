import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../layouts/Sidebar';
import withBaseComponent from '../../../hocs/withBaseComponent';

const Admin = ({ dispatch }) => {
    
    return (
        <div className="relative">
            <Sidebar />
            <div className="ml-[300px]">
                <Outlet />
            </div>
        </div>
    );
};

export default withBaseComponent(Admin);
