import React from 'react';

const Button = ({ children, fullW }) => {
    return (
        <button
            type="submit"
            className={`${
                fullW ? fullW : 'w-[123px]'
            }  text-sm bg-primary text-white uppercase px-2 py-3 hover:bg-hprimary rounded-lg`}
        >
            {children}
        </button>
    );
};

export default Button;
