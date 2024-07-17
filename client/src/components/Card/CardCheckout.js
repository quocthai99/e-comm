import React from 'react';
import { Cart } from '../Input';

const CardCheckout = ({ item }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
            <div className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                <div className="img-box">
                    <img src={item.thumb} alt="a" className="xl:w-[140px]" />
                </div>
                <div className="pro-data w-full max-w-sm ">
                    <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">
                        {item.product.name}
                    </h5>
                    <p className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                        {item.color}
                    </p>
                </div>
            </div>
            <div className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                <h6 className="font-manrope font-bold text-2xl leading-9 text-black w-full max-w-[176px] text-center">
                    {`$${item.price} USD`}
                </h6>
                <Cart item={item} />
                <h6 className="text-primary font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
                    {`$${item.price * item.quantity} USD`}
                </h6>
            </div>
        </div>
    );
};

export default CardCheckout;
