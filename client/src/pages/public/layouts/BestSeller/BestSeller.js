import React, { useEffect, useState } from 'react';

import { CustomSlider } from '../../../../components/Slider';
import Tabs from '../../../../components/Tabs/Tabs';

import { apiGetProducts } from '../../../../services/product'

const tabs = [
    { id: 1, name: 'best seller' },
    {
        id: 2,
        name: 'new arrivals',
    },
    {
        id: 3,
        name: 'table',
    },
];

const BestSeller = () => {
    const [activeTab, setActiveTab] = useState(1);
    const [products, setProducts] = useState(null)

    const fetchDataProducts = async() => {
        const response = await apiGetProducts()
        if (response.status) {
            setProducts(response.products)
        }
    }
console.log(products)
    useEffect(() => {
        fetchDataProducts()
    }, [])

    const handleActiveTab = (id) => {
        setActiveTab(id);
    };

    return (
        <div className="col-span-3 pl-5">
            <div className="w-full">
                <Tabs tabs={tabs} activeTab={activeTab} handleActiveTab={handleActiveTab} />

                <CustomSlider products={products} />
                <div className="mt-10">
                    <div className='grid grid-cols-2 gap-5'>
                        <img src='https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657' alt='banner' />
                        <img src='https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657' alt='banner' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BestSeller;
