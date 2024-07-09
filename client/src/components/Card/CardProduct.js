import React, { useState } from 'react';
import { BsFillSuitHeartFill, BsCartPlus, BsEyeFill } from 'react-icons/bs';

import withBaseComponent from '../../hocs/withBaseComponent'
import path from '../../utils/path';

const CardProduct = ({ product, navigate }) => {
    const [showOptions, setShowOptions] = useState(false);
    
    return (
        <div
            onClick={() => navigate(`/${path.PRODUCTS}/${product.category.toLowerCase()}/${product.name}/${product._id}`)}

            onMouseOver={(e) => {
                e.stopPropagation();
                setShowOptions(true);
            }}
            onMouseOut={(e) => {
                e.stopPropagation();
                setShowOptions(false);
            }}
            className="px-5"
        >
            <div className="relative border p-5 flex flex-col gap-5">
                <img src={product.thumb} alt="product-card" />
                <div className="text-text flex flex-col gap-2">
                    <h4>{product.name}</h4>
                    <span>{`$${product.price} USD`}</span>
                </div>

                {showOptions && (
                    <div className="absolute bottom-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] flex gap-2">
                        <div className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-800 hover:text-white cursor-pointer hover:border-gray-800">
                            <BsFillSuitHeartFill />
                        </div>
                        <div className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-800 hover:text-white cursor-pointer hover:border-gray-800">
                            <BsCartPlus />
                        </div>
                        <div className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-800 hover:text-white cursor-pointer hover:border-gray-800">
                            <BsEyeFill />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default withBaseComponent(CardProduct);
