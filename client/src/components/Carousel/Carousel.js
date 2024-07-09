import React, { useState } from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

const Carousel = ({ children: slides }) => {
    const [curr, setCurr] = useState(0);

    const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
    const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

    return (
        <div className="overflow-hidden w-full h-full relative group">
            <div
                className="flex w-full h-full transition-transform ease-out duration-500 "
                style={{ transform: `translateX(-${curr * 100}%)` }}
            >
                {slides}
            </div>
            <div
                onClick={prev}
                className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-10 text-2xl rounded-full p-2 bg-primary text-white cursor-pointer "
            >
                <MdNavigateBefore size={30} />
            </div>
            <div
                onClick={next}
                className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-primary text-white cursor-pointer"
            >
                <MdNavigateNext size={30} />
            </div>
        </div>
    );
};

export default Carousel;
