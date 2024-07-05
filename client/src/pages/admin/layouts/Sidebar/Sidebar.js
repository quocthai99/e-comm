import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../../../assets/logo_digital.png';
import path from '../../../../utils/path';
import { AiOutlineDashboard, AiOutlineLogout } from 'react-icons/ai';
import { MdGroup } from 'react-icons/md';

const ADMIN_SIDEBAR = [
    {
        id: 0,
        type: 'single',
        title: 'Manage Users',
        to: `/${path.ADMIN}/${path.MANAGE_USER}`,
        icon: <AiOutlineDashboard />,
    },
    {
        id: 1,
        type: 'parent',
        title: 'Manage Products',
        icon: <MdGroup />,
        subMenu: [
            {
                title: 'Create Product',
                to: `/${path.ADMIN}/${path.CREATE_PRODUCTS}`,
            },
            {
                title: 'Manage Products',
                to: `/${path.ADMIN}/${path.MANAGE_PRODUCTS}`,
            },
        ],
    },
    {
        id: 2,
        type: 'single',
        title: 'Manage other',
        to: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
        icon: <AiOutlineDashboard />,
    },
    {
        id: 3,
        type: 'single',
        title: 'Back to home',
        to: `/${path.HOME}`,
        icon: <AiOutlineLogout />,
    },
];

const styleActive = 'flex items-center gap-2 p-5 bg-hprimary cursor-pointer';
const styleNotActive = 'flex items-center gap-2 p-5 hover:bg-hprimary cursor-pointer';

const Sidebar = () => {
    const [activeOptions, setActiveOptions] = useState(false);
    return (
        <div className="fixed w-[300px] shadow-sm shadow-white inset-0 bg-primary text-white">
            <div className="p-5 flex flex-col gap-10">
                <div className="flex flex-col gap-2 items-center text-2xl font-bold">
                    <img src={logo} alt="logo" />
                </div>

                <div className="font-medium text-xl">
                    {ADMIN_SIDEBAR.map((item) => (
                        <div key={item.id}>
                            {item.type === 'single' && (
                                <NavLink
                                    to={item.to}
                                    className={({ isActive }) => (isActive ? styleActive : styleNotActive)}
                                >
                                    <span>{item.icon}</span>
                                    <h4>{item.title}</h4>
                                </NavLink>
                            )}

                            {item.type === 'parent' && (
                                <div>
                                    <div
                                        onClick={() => setActiveOptions(!activeOptions)}
                                        className="flex items-center gap-2 p-5 hover:bg-hprimary cursor-pointer"
                                    >
                                        <span>{item.icon}</span>
                                        <h4>{item.title}</h4>
                                    </div>
                                    {activeOptions &&
                                        item.subMenu.map((menu, i) => (
                                            <NavLink
                                                key={i}
                                                to={menu.to}
                                                className={({ isActive }) => (isActive ? styleActive : styleNotActive)}
                                            >
                                                <h4>{menu.title}</h4>
                                            </NavLink>
                                        ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
