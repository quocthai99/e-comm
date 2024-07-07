import React, { memo } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchInput = ({ type = 'text', placeholder, setSearchUser }) => {
    console.log('re-render')
    return (
        <div className="max-w-[472px] w-[472px] h-10 px-5 relative text-text ">
            <input onChange={e => setSearchUser(prev => ({...prev, q: e.target.value}))} type={type} placeholder={placeholder} className="w-full h-full outline-none px-[15px] shadow shadow-primary" />
            <div className="absolute text-main top-0 right-5 flex items-center justify-center w-10 h-10 cursor-pointer">
                <FaSearch size={20} color="#339CDE" />
            </div>
        </div>
    );
};

export default memo(SearchInput);
