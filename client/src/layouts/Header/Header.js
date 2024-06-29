import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import logo from '../../assets/logo_digital.png';
import { FaUser, FaShoppingCart, FaKey } from 'react-icons/fa';
import { AiOutlineLogout } from "react-icons/ai";
import path from '../../ultils/path';
import withBaseComponent from '../../hocs/withBaseComponent';

import SearchInput from '../../components/SearchInput';
import { Menu } from '../../components/Popper/Menu';

const MENU_ITEMS = [
    {
        id: 0,
        icon: <FaUser />,
        title: 'Login',
        to: `/${path.LOGIN}`,
    },
    {
        id: 1,
        icon: <FaKey />,
        title: 'Register',
        to: `/${path.REGISTER}`,
    },
];

const MENU_ITEMS_PERSONAL = [
    {
        id: 0,
        icon: <FaUser />,
        title: 'Personal',
        to: `/${path.PRIVATE}/${path.PERSONAL}`,
    },
    {
        id: 1,
        icon: <AiOutlineLogout />,
        title: 'Logout',
        to: '/',
    },
];

let dataMenu

const Header = () => {
    const { currentUser } = useSelector((state) => state.auth.login);
    currentUser ? dataMenu = MENU_ITEMS_PERSONAL : dataMenu = MENU_ITEMS

    return (
        <div className="w-full bg-primary text-white">
            <div className="w-main h-[70px] mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <img src={logo} alt="logo" />
                    <SearchInput placeholder="Search something" />
                </div>

                <div className="flex">
                    <Menu items={dataMenu}>
                        {currentUser ? (
                            <div className="flex items-center gap-[10px] pr-5 cursor-pointer border-r border-[#70a5d0]">
                                <FaUser size={20} />
                                <span>{currentUser.name}</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-[10px] pr-5 cursor-pointer border-r border-[#70a5d0]">
                                <FaUser size={20} />
                                <span>Account</span>
                            </div>
                        )}
                    </Menu>

                    <div className="flex items-center gap-[10px] pl-5 cursor-pointer ">
                        <FaShoppingCart size={20} />
                        <span>Cart</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withBaseComponent(Header);
