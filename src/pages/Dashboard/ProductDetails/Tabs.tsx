import React from "react";

interface Props {
    tabs: string[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<Props> = ({ tabs, activeTab, setActiveTab }) => (
    <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded border text-sm
          ${activeTab === tab ? "bg-black text-white dark:bg-white dark:text-black" : "bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"}`}
            >
                {tab}
            </button>
        ))}
    </div>
);

export default Tabs;