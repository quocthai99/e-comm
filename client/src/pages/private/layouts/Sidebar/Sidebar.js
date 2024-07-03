import React from 'react';
import { NavLink } from 'react-router-dom';

import path from '../../../../utils/path';
import avatar from '../../../../assets/avatar.png'
import { AiOutlineDashboard, AiOutlineLogout } from 'react-icons/ai';
import { useSelector } from 'react-redux';

const PRIVATE_SIDEBAR = [
    {
        id: 0,
        title: 'Personal',
        to: `/${path.PRIVATE}/${path.PERSONAL}`,
        icon: <AiOutlineDashboard />,
    },
    {
        id: 1,
        title: 'Back to home',
        to: `/${path.HOME}`,
        icon: <AiOutlineLogout />,
    },
];

const styleActive = 'flex items-center gap-2 p-5 bg-hprimary cursor-pointer'
const styleNotActive = 'flex items-center gap-2 p-5 hover:bg-hprimary cursor-pointer'

const Sidebar = () => {
    const { user } = useSelector(state => state.auth.getCurrent)

    return (
        <div className="fixed w-[400px] shadow-sm shadow-white inset-0 bg-primary text-white">
            <div className="p-5 flex flex-col gap-10">
                <div className="flex flex-col gap-2 items-center text-2xl font-bold">
                    <img src={ user.avatar || avatar } alt='logo' className='w-20 h-20 object-cover' />
                    <h4>{user.name}</h4>
                </div>

                <div className='font-medium text-xl'>
                    {PRIVATE_SIDEBAR.map(item => (
                        <NavLink key={item.id} to={item.to} className={({isActive}) => isActive ? styleActive : styleNotActive}>
                            <span>{item.icon}</span>
                            <h4>{item.title}</h4>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
