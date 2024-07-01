import React from 'react';
import { Link } from 'react-router-dom';


const MenuItem = ({ data, onClick }) => {
    let Comp = 'button'

    if (data.to) {
        Comp = Link
    }
    return (
        <Comp
            onClick={onClick}
            to={data.to}
            key={data.id}
            className=" bg-primary flex items-center gap-5 w-[200px] text-white p-5 cursor-pointer hover:bg-hprimary"
        >
            {data.icon}
            <h4>{data.title}</h4>
        </Comp>
    );
};

export default MenuItem;
