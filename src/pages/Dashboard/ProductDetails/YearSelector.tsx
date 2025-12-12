import React, { useRef, useEffect } from "react";

interface Props {
    selectedYear: number;
    years: number[];
    open: boolean;
    setOpen: (open: boolean) => void;
    onSelectYear: (year: number) => void;
}

const YearSelector: React.FC<Props> = ({ selectedYear, years, open, setOpen, onSelectYear }) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setOpen]);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="border px-4 py-2 rounded bg-white dark:bg-gray-900 dark:text-white text-sm w-32 flex items-center justify-between"
            >
                {selectedYear}
                <span className={`transition-transform ${open ? "rotate-180" : ""}`}>▼</span>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border rounded shadow min-w-[200px] p-3 z-50">
                    <div className="grid grid-cols-3 gap-2">
                        {years.map((y) => (
                            <button
                                key={y}
                                onClick={() => { onSelectYear(y); setOpen(false); }}
                                className={`w-full py-2 rounded text-sm font-medium text-center transition-colors
                  ${y === selectedYear
                                        ? "bg-black text-white dark:bg-white dark:text-black"
                                        : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
                                    }`}
                            >
                                {y}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default YearSelector;