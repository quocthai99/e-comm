import React from 'react';

const Tabs = ({ tabs, handleActiveTab, activeTab }) => {
    return (
        <div className="mb-5 pb-[15px] border-b border-primary flex font-semibold text-xl ">
            {tabs.map((tab) => (
                <div
                    onClick={() => handleActiveTab(tab.id)}
                    key={tab.id}
                    className={`${activeTab === tab.id ? 'text-primary' : 'text-text '} uppercase cursor-pointer hover:text-primary last:pl-5 last:ml-5 last:border-l last:border-primary [&:nth-child(2)]:ml-5 [&:nth-child(2)]:pl-5 [&:nth-child(2)]:border-l [&:nth-child(2)]:border-primary `}
                >
                    {tab.name}
                </div>
            ))}
        </div>
    );
};

export default Tabs;
