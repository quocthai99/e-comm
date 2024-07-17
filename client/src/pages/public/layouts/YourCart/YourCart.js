import React from 'react';
import { useSelector } from 'react-redux';
import { AiFillCloseCircle } from 'react-icons/ai';
import Button from '../../../../components/Button';
import CardCart from '../../../../components/Card/CardCart';
import withBaseComponent from '../../../../hocs/withBaseComponent';
import path from '../../../../utils/path'

const YourCart = ({ setShowYourCart, navigate }) => {
    const cart = useSelector((state) => state.cart.cart);

    return (
        <div className="fixed right-0 top-0 bottom-0 w-[400px] bg-black text-white p-5 z-20 ">
            <div className="grid grid-rows-10">
                {/* HEADER CART */}
                <header className="row-span-1 flex justify-between items-center uppercase font-semibold text-xl pb-10 mb-5 border-b border-gray-700">
                    <h2>Your Cart</h2>
                    <div onClick={() => setShowYourCart(false)} className="cursor-pointer">
                        <AiFillCloseCircle size={24} />
                    </div>
                </header>
                {/* PRODUCT CART */}
                <div className="row-span-7 h-full overflow-y-auto">
                    {cart?.map((item) => (
                        <CardCart 
                            key={item._id}
                            item={item}
                        />
                    ))}
                </div>
                {/* FOOTER CARD */}
                <div className="row-span-2 h-full flex flex-col gap-5 justify-end">
                    <div className="font-semibold text-lg flex justify-between items-center">
                        <h4>SUBTOTAL</h4>
                        <span>TOTAL MONEY</span>
                    </div>

                    <div className="text-sm italic text-gray-300">
                        Shipping, taxes, and discounts calculated at checkout.
                    </div>

                    <Button onClick={() => {
                        navigate(`${path.CART}`)
                        setShowYourCart(false)
                    }} cusWidth="w-full">
                        SHOPPING CART
                    </Button>
                    <Button cusWidth="w-full">CHECKOUT</Button>
                </div>
            </div>
        </div>
    );
};

export default withBaseComponent(YourCart);
