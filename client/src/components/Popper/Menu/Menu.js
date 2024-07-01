import React from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import MenuItem from './MenuItem';
import { apiLogout } from '../../../services/auth';
import withBaseComponent from '../../../hocs/withBaseComponent';
import { useSelector } from 'react-redux';

const Menu = ({ children, items, dispatch }) => {
    const { accessToken } = useSelector(state => state.auth.login)
    
    const renderItems = () =>
        items.map((item) => {
            return (
                <MenuItem
                    onClick={() => {
                        if (item.title === 'Logout') {
                            apiLogout(accessToken, dispatch)
                        }
                    }}
                    key={item.id}
                    data={item}
                />
            );
        });
        

    return (
        <div>
            <HeadlessTippy
                interactive
                placement="bottom-start"
                render={(attrs) => (
                    <div {...attrs} className="shadow shadow-sky-500 text-black bg-sky-100">
                        {renderItems()}
                    </div>
                )}
            >
                {children}
            </HeadlessTippy>
        </div>
    );
};

export default withBaseComponent(Menu);
