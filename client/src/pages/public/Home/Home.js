import React from 'react';

import Sidebar from '../layouts/Sidebar';
import Banner from '../layouts/Banner';
import DailyDeals from '../layouts/DailyDeals';
import BestSeller from '../layouts/BestSeller';

const Home = () => {
    return (
        <div className="xl:w-main mx-auto">
            <div className='grid grid-cols-4 mt-5'>
                <Sidebar />
                <Banner />
            </div>

            <div className='grid grid-cols-4 mt-5' >
                <DailyDeals />
                <BestSeller />
            </div>
        </div>
    );
};

export default Home;
