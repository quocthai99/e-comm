import React from 'react';
import Slider from 'react-slick';

import { CardProduct } from '../Card'

const CustomSlider = ({ products }) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className='mt-10' >
            <Slider {...settings}>
                {products?.map(product => (
                    <CardProduct 
                        key={product._id}
                        product={product}
                    />
                ))}
            </Slider>
        </div>
    );
};

export default CustomSlider;
