import React from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import logo from '../../assets/logo_digital.png';
import { FaUser, FaShoppingCart, FaKey } from 'react-icons/fa';
import path from '../../ultils/path';
import withBaseComponent from '../../hocs/withBaseComponent';

import SearchInput from '../../components/SearchInput';

const Header = ({ navigate }) => {
    return (
        <div className="w-full bg-primary text-white">
            <div className="w-main h-[70px] mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <img src={logo} alt="logo" />
                    <SearchInput placeholder="Search something" />
                </div>

                <div className="flex">
                    <HeadlessTippy
                        interactive
                        placement="bottom-start"
                        render={(attrs) => (
                            <div
                                {...attrs}
                                className="bg-primary shadow border border-sky-300 shadow-sky-500 text-white max-w-[200px] w-[200px] p-5 flex flex-col gap-5"
                            >
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <FaKey />
                                    <span onClick={() => navigate(`/${path.REGISTER}`)} className="hover:underline">Đăng ký</span>
                                </div>
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <FaUser />
                                    <span onClick={() => navigate(`/${path.LOGIN}`)} className="hover:underline">Đăng nhập</span>
                                </div>
                            </div>
                        )}
                    >
                        <div className="flex items-center gap-[10px] pr-5 cursor-pointer border-r border-[#70a5d0]">
                            <FaUser size={20} />
                            <span>Account</span>
                        </div>
                    </HeadlessTippy>

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
