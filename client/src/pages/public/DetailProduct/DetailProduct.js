import React from 'react';

import Breadcrumbs from '../../../layouts/Breadcrumbs';

const DetailProduct = () => {
    return (
        <div>
            <div className="w-full bg-sky-100 min-h-[80px]">
                <div className="w-main m-auto py-[10px]">
                    <div className="mb-[10px] text-primary font-bold text-lg">
                        <span>REGISTER</span>
                    </div>
                    <Breadcrumbs />
                </div>
            </div>
        </div>
    );
};

export default DetailProduct;
