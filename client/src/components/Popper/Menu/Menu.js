import React from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import MenuItem from './MenuItem';

const Menu = ({ children, items }) => {

    const renderItems = () => items.map(item =>  <MenuItem key={item.id} data={item} />)
    
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

export default Menu;
