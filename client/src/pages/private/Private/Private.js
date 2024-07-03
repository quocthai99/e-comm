import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import withBaseComponent from '../../../hocs/withBaseComponent';
import { apiGetCurrent } from '../../../services/user';

import Sidebar from '../layouts/Sidebar';
import { useSelector } from 'react-redux';

const Private = ({ dispatch }) => {
    const { currentUser } = useSelector((state) => state.auth.login);
    console.log('currentUser acc', currentUser.accessToken)
    
    useEffect(() => {
        if (currentUser) {
            apiGetCurrent(currentUser.accessToken, dispatch);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    return (
        <div className="relative">
            <Sidebar />
            <div className="ml-[400px]">
                <Outlet />
            </div>
        </div>
    );
};

export default withBaseComponent(Private);
