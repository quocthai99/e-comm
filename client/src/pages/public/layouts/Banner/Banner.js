import React from 'react';
import Carousel from '../../../../components/Carousel/Carousel';

const sliders = [
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/samsung-m55-sliding-01-7-2024.png',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/home-asus-tuf-gaming-new-01-07.png',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/huawei-watch-gt4-home.jpg',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/oppo-reno12-banner-sliding-5-7-2024.jpg',
];

const Banner = () => {
    return (
        <div className="col-span-3 pl-5">
            <div className="w-full h-full">
                <Carousel>
                    {sliders.map((img, i) => (
                        <img key={i} src={img} alt="banner" className='w-full h-full object-contain' />
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default Banner;
