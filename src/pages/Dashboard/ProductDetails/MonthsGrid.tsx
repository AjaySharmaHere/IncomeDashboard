import React from "react";
import { currency } from "./helpers";

interface Props {
    selectedMonth: number | null;
    setSelectedMonth: (month: number | null) => void;
    monthTotals: number[];
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const MonthsGrid: React.FC<Props> = ({ selectedMonth, setSelectedMonth, monthTotals }) => (
    <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-3">
        {MONTHS.map((m, i) => {
            const total = monthTotals[i];
            const active = selectedMonth === i;

            return (
                <div
                    key={m}
                    onClick={() => total > 0 && setSelectedMonth(active ? null : i)}
                    className={`relative p-3 rounded border text-center cursor-pointer
            ${active
                            ? "bg-black text-white dark:bg-white dark:text-gray-900"
                            : "bg-white dark:bg-gray-800 dark:text-gray-200"}
            ${total === 0 ? "opacity-40 cursor-not-allowed" : "hover:shadow"}`}
                >
                    <div className="text-xs">{m}</div>
                    <div className="font-semibold">{currency(total)}</div>

                    {active && (
                        <span
                            className="absolute top-1 right-1 font-bold cursor-pointer text-gray-700 dark:text-gray-900"
                            onClick={(e) => { e.stopPropagation(); setSelectedMonth(null); }}
                        >
                            ×
                        </span>
                    )}
                </div>
            );
        })}
    </div>
);

export default MonthsGrid;