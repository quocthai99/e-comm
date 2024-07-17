import React from 'react';
import { useSelector } from 'react-redux';
import Breadcrumbs from '../../../layouts/Breadcrumbs';
import { CardCheckout } from '../../../components/Card';
import Button from '../../../components/Button';

const Cart = () => {
    const cart = useSelector((state) => state.cart.cart);

    return (
        <div>
            <div className="w-full bg-sky-100 min-h-[80px]">
                <div className="xl:w-main sm:w-full mx-auto py-[10px]">
                    <div className="mb-[10px] text-primary font-bold text-lg">
                        <span>Cart</span>
                    </div>
                    <Breadcrumbs />
                </div>
            </div>

            <div className="xl:w-main sm:w-full mx-auto my-5 border p-10">
                <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-primary">
                    Shopping Cart
                </h2>
                <div className="hidden lg:grid grid-cols-2 py-6">
                    <div className="font-normal text-xl leading-8 text-gray-500">Product</div>
                    <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
                        <span className="w-full max-w-[200px] text-center">Price</span>
                        <span className="w-full max-w-[260px] text-center">Quantity</span>
                        <span className="w-full max-w-[200px] text-center">Total</span>
                    </p>
                </div>
                {cart?.map((item) => (
                    <CardCheckout key={item._id} item={item} />
                ))}

                <div className="bg-sky-100 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
                    <div className="flex items-center justify-between w-full mb-6">
                        <p className="font-normal text-xl leading-8 text-gray-400">Sub Total</p>
                        <h6 className="font-semibold text-xl leading-8 text-gray-900">{`$${cart.reduce(
                            (acc, cur) => acc + cur.price * cur.quantity,
                            0,
                        )}`}</h6>
                    </div>
                    <div className="flex items-center justify-between w-full py-6 text-primary">
                        <p className="font-manrope font-medium text-2xl leading-9 ">Total</p>
                        <h6 className="font-manrope font-medium text-2xl leading-9 ">{`$${cart.reduce(
                            (acc, cur) => acc + cur.price * cur.quantity,
                            0,
                        )}`}</h6>
                    </div>
                </div>

                <Button>CHECK OUT</Button>
            </div>
        </div>
    );
};

export default Cart;
