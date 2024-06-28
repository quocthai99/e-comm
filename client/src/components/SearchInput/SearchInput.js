import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchInput = ({ type = 'text', placeholder }) => {
    return (
        <div className="max-w-[472px] w-[472px] h-10 px-5 relative text-text ">
            <input type={type} placeholder={placeholder} className="w-full h-full outline-none px-[15px]" />
            <div className="absolute text-main top-0 right-5 flex items-center justify-center w-10 h-10 cursor-pointer">
                <FaSearch size={20} color="#339CDE" />
            </div>
        </div>
    );
};

export default SearchInput;
