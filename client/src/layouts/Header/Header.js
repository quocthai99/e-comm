import React from 'react';
import { useSelector } from 'react-redux';

import logo from '../../assets/logo_digital.png';
import { FaUser, FaShoppingCart, FaKey } from 'react-icons/fa';
import { AiOutlineLogout, AiOutlineMenu } from 'react-icons/ai';
import path from '../../utils/path';
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
    },
];

const MENU_ITEMS_ADMIN = [
    {
        id: 0,
        icon: <FaUser />,
        title: 'ADMIN',
        to: `/${path.ADMIN}/${path.MANAGE_USER}`,
    },
    {
        id: 1,
        icon: <AiOutlineLogout />,
        title: 'Logout',
    },
];

let dataMenu;

const Header = () => {
    const { currentUser } = useSelector((state) => state.auth.login);
    if (currentUser && currentUser.isAdmin) {
        dataMenu = MENU_ITEMS_ADMIN;
    } else if (currentUser && !currentUser.isAdmin) {
        dataMenu = MENU_ITEMS_PERSONAL;
    } else if (!currentUser) {
        dataMenu = MENU_ITEMS;
    }
    console.log(currentUser);
    return (
        <div className="w-full bg-primary text-white">
            <div className="xl:w-main h-[70px] xl:mx-auto md:mx-10 flex items-center justify-between">
                {/* Responsive */}
                <div className="md:block lg:hidden cursor-pointer ">
                    <AiOutlineMenu size={20} />
                </div>
                <div className="md:flex lg:hidden items-center">
                    <img src={logo} alt="logo" />
                </div>
                <div className="md:block lg:hidden cursor-pointer ">
                    <FaShoppingCart size={20} />
                </div>

                {/* Main layout */}
                <div className="lg:flex md:hidden items-center">
                    <img src={logo} alt="logo" />
                    <SearchInput placeholder="Search something" />
                </div>

                <div className="lg:flex md:hidden">
                    <Menu items={dataMenu}>
                        {currentUser ? (
                            <div className="flex items-center gap-[10px] pr-5 cursor-pointer border-r border-[#70a5d0]">
                                <div>
                                    <img
                                        src={currentUser.avatar}
                                        alt="avatar"
                                        className="w-10 h-10 object-cover rounded-full"
                                    />
                                </div>
                                <h4>{currentUser.name}</h4>
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
