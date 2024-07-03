import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../layouts/Sidebar';
import { apiGetCurrent } from '../../../services/user';
import withBaseComponent from '../../../hocs/withBaseComponent';
import { useSelector } from 'react-redux';

const Admin = ({ dispatch }) => {
    const { currentUser } = useSelector((state) => state.auth.login);
    const { user } = useSelector(state => state.auth.getCurrent)
    console.log({currentUser, user})
    useEffect(() => {
            apiGetCurrent(currentUser.accessToken, dispatch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);
    
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
