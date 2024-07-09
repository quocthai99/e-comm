import React from 'react';
import Breadcrumbs from '../../../layouts/Breadcrumbs';

const Product = () => {
    return (
        <div>
            <div className="w-full bg-sky-100 min-h-[80px]">
                <div className="w-main m-auto py-[10px]">
                    <div className="mb-[10px] text-primary font-bold text-lg">
                        <span>Products</span>
                    </div>
                    <Breadcrumbs />
                </div>
            </div>
            
            <div>
                <div className="w-main mx-auto my-10">Products</div>
            </div>
        </div>
    );
};

export default Product;
