import React from 'react';
import withBaseComponent from '../../hocs/withBaseComponent';
import { decrementItem, incrementItem } from '../../redux/cart/CartSlice';

const Quantity = ({ item, dispatch }) => {

    const handleIncrement = (id) => {   
        dispatch(incrementItem(id))
    }

    const handleDecrement = (id) => {
        dispatch(decrementItem(id))
    }

    return (
        <div>
            <form className="max-w-xs">
                <div className="relative flex items-center max-w-[8rem]">
                    <button
                        onClick={() => handleDecrement(item._id)}
                        type="button"
                        className="bg-black hover:bg-gray-800 border border-gray-300 p-2 focus:outline-none"
                    >
                        <svg
                            className="w-3 h-3 text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h16"
                            />
                        </svg>
                    </button>
                    <input
                        onChange={(e) => e.target.value}
                        value={item.quantity}
                        type="text"
                        className="bg-black border-y-2 text-center text-white text-sm w-[30%] py-1 "
                    />
                    <button
                        onClick={() => handleIncrement(item._id)}
                        type="button"
                        className="bg-black hover:bg-gray-800 border border-gray-300 p-2 focus:outline-none"
                    >
                        <svg
                            className="w-3 h-3 text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 1v16M1 9h16"
                            />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default withBaseComponent(Quantity);
