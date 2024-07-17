import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import logo from '../../assets/logo_digital.png';
import { FaUser, FaShoppingCart, FaKey } from 'react-icons/fa';
import { AiOutlineLogout, AiOutlineMenu } from 'react-icons/ai';
import path from '../../utils/path';
import withBaseComponent from '../../hocs/withBaseComponent';

import SearchInput from '../../components/SearchInput';
import { Menu } from '../../components/Popper/Menu';
import YourCart from '../../pages/public/layouts/YourCart';

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
    const cart = useSelector((state) => state.cart.cart);
    const [showYourCart, setShowYourCart] = useState(false)

    if (currentUser && currentUser.isAdmin) {
        dataMenu = MENU_ITEMS_ADMIN;
    } else if (currentUser && !currentUser.isAdmin) {
        dataMenu = MENU_ITEMS_PERSONAL;
    } else if (!currentUser) {
        dataMenu = MENU_ITEMS;
    }
    
    return (
        <div className="w-full bg-primary text-white">
            {showYourCart && <YourCart setShowYourCart={setShowYourCart} />}
            <div className="xl:w-main h-[70px] xl:mx-auto sm:mx-10 flex items-center justify-between">
                {/* Responsive */}
                <div className="sm:block lg:hidden cursor-pointer ">
                    <AiOutlineMenu size={20} />
                </div>
                <div className="sm:flex lg:hidden items-center">
                    <img src={logo} alt="logo" />
                </div>
                <div className="sm:block lg:hidden cursor-pointer ">
                    <FaShoppingCart size={20} />
                </div>

                {/* Main layout */}
                <div className="lg:flex sm:hidden items-center">
                    <img src={logo} alt="logo" />
                    <SearchInput placeholder="Search something" />
                </div>

                <div className="lg:flex sm:hidden">
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

                    <div onClick={() => setShowYourCart(true)} className="flex items-center gap-[10px] pl-5 cursor-pointer relative ">
                        <FaShoppingCart size={20} />
                        <span >Cart</span>
                        <span className='absolute px-2 top-[-10px] left-8 rounded-full bg-red-400 '>{cart?.length || 0}</span>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default withBaseComponent(Header);
