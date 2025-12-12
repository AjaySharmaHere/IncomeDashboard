import React, { useMemo } from "react";
import { safeNumber, currency } from "./helpers";

interface Props {
    entries: any[];
}

const OverallStats: React.FC<Props> = ({ entries }) => {
    const totals = useMemo(() => {
        let income = 0;
        let expenditure = 0;

        entries.forEach((e) => {
            const amount = safeNumber(e.price);
            if (e.status?.toLowerCase() === "expenditure") {
                expenditure += amount;
            } else if (e.status?.toLowerCase() === "success") {
                income += amount;
            }
        });

        return { income, expenditure };
    }, [entries]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-lg bg-white dark:bg-gray-900 border dark:border-gray-800">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    Total Income
                </div>
                <div className="text-2xl font-semibold text-green-600 mt-1">
                    {currency(totals.income)}
                </div>
            </div>

            <div className="p-5 rounded-lg bg-white dark:bg-gray-900 border dark:border-gray-800">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    Total Expenditure
                </div>
                <div className="text-2xl font-semibold text-red-500 mt-1">
                    {currency(totals.expenditure)}
                </div>
            </div>
        </div>
    );
};

export default OverallStats;
