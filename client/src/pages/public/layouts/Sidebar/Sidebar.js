import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../../../utils/constants';
import path from '../../../../utils/path';
import { AiOutlineMenu } from 'react-icons/ai';

const Sidebar = () => {
    return (
        <div className="col-span-1">
            <div className='border'>
                <div className="bg-primary text-white px-5 py-[10px] flex items-center gap-2">
                    <AiOutlineMenu size={24} />
                    <span className="uppercase font-semibold">all collections</span>
                </div>
                <div className="text-text">
                    {categories?.map((cate, i) => (
                        <Link
                            to={`${path.PRODUCTS}/${cate.name.toLowerCase()}`}
                            key={i}
                            className="px-5 py-4 flex items-center gap-3"
                        >
                            <img src={cate.icon} alt="icons" className="w-5 h-5 object-cover" />
                            <span className=" hover:text-primary cursor-pointer">{cate.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
