import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../../../assets/logo_digital.png'
import path from '../../../../utils/path';
import { AiOutlineDashboard, AiOutlineLogout } from 'react-icons/ai';

const PRIVATE_SIDEBAR = [
    {
        id: 0,
        title: 'Manage Users',
        to: `/${path.ADMIN}/${path.MANAGE_USER}`,
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
    
    return (
        <div className="fixed w-[400px] shadow-sm shadow-white inset-0 bg-primary text-white">
            <div className="p-5">
                <div className="mx-auto">
                    <img src={logo} alt='logo' />
                </div>

                <div className='mt-10 font-medium text-2xl'>
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
