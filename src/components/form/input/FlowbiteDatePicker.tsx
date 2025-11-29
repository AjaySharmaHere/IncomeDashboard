import { useEffect, useRef } from "react";
import Datepicker from "flowbite-datepicker/Datepicker";

interface Props {
  value: string;
  onChange: (date: string) => void;
}

export default function FlowbiteDatePicker({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const picker = new Datepicker(inputRef.current, {
      autohide: true,
      format: "yyyy-mm-dd",
      todayHighlight: true,
      theme: "light",
    });

    const handler = () => {
      // Safely get the value from the input
      const dateValue = inputRef.current?.value;
      if (dateValue) onChange(dateValue);
    };

    inputRef.current.addEventListener("changeDate", handler);

    return () => {
      inputRef.current?.removeEventListener("changeDate", handler);
      picker.destroy();
    };
  }, []);

  return (
    <div className="relative">
      {/* ICON */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 001-1V7a1 1 0 00-1-1H5a1 1 0 00-1 1v12a1 1 0 001 1Z"
          />
        </svg>
      </div>

      {/* INPUT */}
      <input
        ref={inputRef}
        defaultValue={value}
        type="text"
        readOnly
        placeholder="Select date"
        className="
          block w-full pl-10 pr-3 py-2.5
          rounded-lg
          border appearance-none shadow-theme-xs focus:outline-none focus:ring dark:bg-gray-900 dark:text-white/90 bg-transparent border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800
        "
      />
    </div>
  );
}
