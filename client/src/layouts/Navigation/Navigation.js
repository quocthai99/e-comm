import React from 'react';
import withBaseComponent from '../../hocs/withBaseComponent';
import { Link } from 'react-router-dom';
import { navigation } from '../../utils/constants'

const Navigation = ({navigate}) => {
    return (
        <div className="border-b">
            <div className="xl:w-main h-[70px] mx-auto flex items-center gap-5">
              {navigation.map(el => (
                <Link key={el.name} to={el.path} className='flex flex-col items-center hover:text-primary cursor-pointer'>
                  <h2>{el.name}</h2>
              </Link>
              ))}
            </div>
        </div>
    );
};

export default withBaseComponent(Navigation);
