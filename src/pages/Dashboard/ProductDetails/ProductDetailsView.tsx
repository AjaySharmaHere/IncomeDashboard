import { useMemo, useState } from "react";
import { formatDate, safeNumber, currency } from "./helpers";
import { useProductEntries } from "./useProductEntries";
import StatsCard from "./StatsCard";
import Tabs from "./Tabs";
import YearSelector from "./YearSelector";
import MonthsGrid from "./MonthsGrid";
import OverallStats from "./OverallStats";

const TAB_LIST = ["Success", "Pending", "Expenditure", "All"];

const ProductDetailsView: React.FC = () => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState("Success");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const {
        entries,
        loading,
        years,
        monthTotals,
        yearStats,
        monthStats,
    } = useProductEntries(selectedYear, selectedMonth);

    const filtered = useMemo(() => {
        let list = entries.filter((e) => {
            const d = new Date(e.date);
            return (
                d.getFullYear() === selectedYear &&
                (selectedMonth === null || d.getMonth() === selectedMonth)
            );
        });

        if (activeTab !== "All") {
            list = list.filter(
                (e) => e.status?.toLowerCase() === activeTab.toLowerCase()
            );
        }

        return list;
    }, [entries, selectedYear, selectedMonth, activeTab]);

    return (
        <div className="p-6 space-y-6">

            {/* ✅ OVERALL STATS – ALWAYS VISIBLE */}
            <OverallStats entries={entries} />

            {/* Tabs + Year Selector */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <Tabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    tabs={TAB_LIST}
                />
                <YearSelector
                    selectedYear={selectedYear}
                    years={years}
                    open={dropdownOpen}
                    setOpen={setDropdownOpen}
                    onSelectYear={(y) => {
                        setSelectedYear(y);
                        setSelectedMonth(null);
                    }}
                />
            </div>

            {/* Months Grid */}
            <MonthsGrid
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                monthTotals={monthTotals}
            />

            {/* Year Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatsCard label="Year Income" value={yearStats.income} />
                <StatsCard label="Year Expenditure" value={yearStats.expenditure} />
                <StatsCard label="Year Pending" value={yearStats.pending} />
            </div>

            {/* Month Stats */}
            {monthStats && (
                <>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                        {new Date(selectedYear, selectedMonth!).toLocaleString("en-IN", {
                            month: "long",
                            year: "numeric",
                        })}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <StatsCard label="Month Income" value={monthStats.income} />
                        <StatsCard
                            label="Month Expenditure"
                            value={monthStats.expenditure}
                        />
                        <StatsCard label="Month Pending" value={monthStats.pending} />
                    </div>
                </>
            )}

            {/* Table */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded overflow-x-auto">
                <table className="w-full text-sm text-gray-800 dark:text-gray-100">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th className="p-3 text-left">Product</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Payment</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan={5} className="p-6 text-center">
                                    Loading…
                                </td>
                            </tr>
                        )}

                        {!loading && filtered.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-6 text-center">
                                    No records
                                </td>
                            </tr>
                        )}

                        {filtered.map((e, i) => (
                            <tr
                                key={i}
                                className="border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                                <td className="p-3">{e.productName}</td>
                                <td className="p-3">{formatDate(e)}</td>
                                <td className="p-3">{e.paymentMode}</td>
                                <td className="p-3">{e.status}</td>
                                <td className="p-3 text-right">
                                    {currency(safeNumber(e.price))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductDetailsView;
