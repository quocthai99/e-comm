import React from 'react';
import withBaseComponent from '../../hocs/withBaseComponent';
import { decrementItem, incrementItem } from '../../redux/cart/CartSlice';

const Cart = ({ item, dispatch }) => {
    const handleIncrement = (id) => {
        dispatch(incrementItem(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementItem(id));
    };
    return (
        <div className="flex items-center w-full mx-auto justify-center">
            <button
                onClick={() => handleDecrement(item._id)}
                className="group rounded-l-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
            >
                <svg
                    className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                >
                    <path d="M16.5 11H5.5" stroke="" strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
            </button>
            <input
                type="text"
                className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
                value={item.quantity}
                onChange={(e) => e.target.value}
            />
            <button
                onClick={() => handleIncrement(item._id)}
                className="group rounded-r-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
            >
                <svg
                    className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                >
                    <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeWidth="1.6" strokeLinecap="round" />
                    <path
                        d="M11 5.5V16.5M16.5 11H5.5"
                        stroke=""
                        strokeOpacity="0.2"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                    />
                    <path
                        d="M11 5.5V16.5M16.5 11H5.5"
                        stroke=""
                        strokeOpacity="0.2"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                    />
                </svg>
            </button>
        </div>
    );
};

export default withBaseComponent(Cart);
