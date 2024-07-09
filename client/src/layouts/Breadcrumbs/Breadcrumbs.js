import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

const Breadcrumbs = () => {
    const params = useParams();
    
    const routes = [
        { path: '/', breadcrumb: 'Home' },
        { path: '/products', breadcrumb: 'Products' },
        {
            path: '/products/:category',
            breadcrumb: params.category && params.category.slice(0, 1).toUpperCase() + params.category.slice(1),
        },
        { path: '/products/:category/:name', breadcrumb: params.name },
    ];

    const breadcrumbs = useBreadcrumbs(routes);

    return (
        <div className="flex items-center gap-2 text-primary">
            {breadcrumbs.slice(0, 4).map(({ match, breadcrumb }, i, arr) => (
                <Link key={match.pathname} to={match.pathname} className="flex items-center gap-2">
                    <span className={`${i < arr.length - 1 ? 'hover:underline' : 'cursor-text'}`}>{breadcrumb}</span>
                    {i < arr.length - 1 && <FaChevronRight size={8} className="mt-1" />}
                </Link>
            ))}
        </div>
    );
};

export default Breadcrumbs;
