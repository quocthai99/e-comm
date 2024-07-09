import React from 'react';
import Button from '../../../../components/Button';

const DailyDeals = () => {
    return (
        <div className="col-span-1 p-5 border">
            <div className="text-center font-bold text-lg mb-5">
                <span className="uppercase tracking-widest">daily deals</span>
            </div>

            <img src="https://digital-world-2.myshopify.com/cdn/shop/products/z4_345x550.jpg?v=1491404851" alt="deal" />

            <div className="text-center tracking-wider text-lg ">
                <h4 className="my-2">title</h4>
                <h4 className="my-2">title</h4>
                <div className="mb-5">{`1000 $`}</div>
            </div>

            <div className="grid grid-cols-3 gap-2 my-5">
                <div className="flex justify-center items-center rounded-md bg-[#F4F4F4] flex-col ">
                    <span className="text-[18px] text-gray-800 ">{0}</span>
                    <span className="text-xs text-gray-700">{'time'}</span>
                </div>
                <div className="flex justify-center items-center rounded-md bg-[#F4F4F4] flex-col ">
                    <span className="text-[18px] text-gray-800 ">{0}</span>
                    <span className="text-xs text-gray-700">{'time'}</span>
                </div>
                <div className="flex justify-center items-center rounded-md bg-[#F4F4F4] flex-col ">
                    <span className="text-[18px] text-gray-800 ">{0}</span>
                    <span className="text-xs text-gray-700">{'time'}</span>
                </div>
            </div>

            <Button cusWidth='w-full' >Options</Button>
        </div>
    );
};

export default DailyDeals;
