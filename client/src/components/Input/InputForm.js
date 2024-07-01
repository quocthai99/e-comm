import React from 'react';

const InputForm = ({ label, type = 'text', id, register, errors, placeholder, validate, disabled }) => {
    
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-primary dark:text-white">{label}</label>
            <input
                type={type}
                id={id}
                className={`${disabled ? 'bg-sky-100' : 'bg-gray-50' } border outline-none border-primary text-text text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ` }
                placeholder={placeholder}
                {...register(id, validate)}
                disabled={disabled}
            />
            {errors[id] && <span className="text-sm text-errorColor italic">{errors[id].message}</span>}
        </div>
    );
};

export default InputForm;
