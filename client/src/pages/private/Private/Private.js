import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import withBaseComponent from '../../../hocs/withBaseComponent';
import { apiGetCurrent } from '../../../services/user';
import path from '../../../ultils/path';

import Sidebar from '../layouts/Sidebar';
import { useSelector } from 'react-redux';

const Private = ({ dispatch, navigate }) => {
    const { accessToken } = useSelector(state => state.auth.login)
    const { user } = useSelector(state => state.user.getCurrent)
    console.log({accessToken, user})

    useEffect(() => {
        if (!user) {
            navigate(`/${path.LOGIN}`)
        }
        if (accessToken) {
            apiGetCurrent(accessToken, dispatch)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='relative'>
            <Sidebar />
            <div className='ml-[400px]'>
                <Outlet />
            </div>
        </div>
    );
};

export default withBaseComponent(Private);
