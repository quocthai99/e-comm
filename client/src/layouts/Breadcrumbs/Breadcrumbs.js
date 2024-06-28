import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';


const Breadcrumbs = () => {
    const params = useParams();

    const routes = [
        { path: '/', breadcrumb: 'Home' },
        { path: '/collections', breadcrumb: 'Collections' },
        {
            path: '/collections/:category',
            breadcrumb: params.category && params.category.slice(0, 1).toUpperCase() + params.category.slice(1),
        },
        { path: '/collections/:category/:title', breadcrumb: params.title },
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
