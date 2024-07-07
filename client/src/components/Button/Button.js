import React from 'react';

const Button = ({ children, fullW, cusColor, onClick }) => {
    return (
        <button
            onClick={onClick}
            type="submit"
            className={`${
                fullW ? fullW : 'w-[123px]'
            }  text-sm ${cusColor ? cusColor : 'bg-primary hover:bg-hprimary' } text-white uppercase px-2 py-3  rounded-lg`}
        >
            {children}
        </button>
    );
};

export default Button;
