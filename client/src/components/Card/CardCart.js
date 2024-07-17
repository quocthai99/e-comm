import React from 'react';
import { Quantity } from '../Input';

const CardCart = ({ item }) => {
    return (
        <div className="flex gap-5 mt-5">
            <div>
                <img src={item.thumb} alt="thumb-cart" className="w-20 object-contain" />
            </div>

            <div className="flex flex-col justify-between uppercase">
                <h4>{item.product.name}</h4>
                <span>{item.color}</span>
                <Quantity item={item} />
            </div>

            <div className="col-span-1 text-wrap text-sm">{`$${item.price * item.quantity} USD`}</div>
        </div>
    );
};

export default CardCart;
