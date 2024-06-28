import React from 'react';
import withBaseComponent from '../../hocs/withBaseComponent';
import { Link } from 'react-router-dom';

const nav = [
    {
        name: 'Smartphone',
        path: '/collections/smartphone',
        icon: 'https://digital-world-2.myshopify.com/cdn/shop/t/26/assets/smartphone.png?v=117726531047959052161628340889',
    },
    {
        name: 'Laptop',
        path: '/collections/laptop',
        icon: 'https://digital-world-2.myshopify.com/cdn/shop/t/26/assets/laptop.png?v=60805008396908785021628340873',
    },
    {
        name: 'Accessories',
        path: '/collections/accessories',
        icon: 'https://digital-world-2.myshopify.com/cdn/shop/t/26/assets/accessories.png?v=67538387381806079151628340853',
    },
];

const Navigation = ({navigate}) => {
    return (
        <div className="border-b">
            <div className="w-main h-[70px] mx-auto flex items-center gap-5">
              {nav.map(el => (
                <Link key={el.name} to={el.path} className='flex flex-col items-center hover:text-primary cursor-pointer'>
                  <img src={el.icon} alt='icon' className='w-5 h-5 object-cover' />
                  <h2>{el.name}</h2>
              </Link>
              ))}
            </div>
        </div>
    );
};

export default withBaseComponent(Navigation);
