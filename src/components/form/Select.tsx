// // Payement Mode and Status Select Component

import { useEffect, useRef, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  defaultValue?: string;
}

const Select = ({
  options,
  placeholder = "Select option",
  onChange,
  defaultValue = "",
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel =
    options.find((o) => o.value === value)?.label ?? "";

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* INPUT */}
      <div
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex h-11 items-center justify-between rounded-lg border
          bg-white px-4 text-sm shadow-theme-xs cursor-pointer
          border-gray-300 text-gray-800

          focus:outline-none focus:ring-2 focus:ring-brand-500/20
          focus:border-brand-300

          dark:bg-gray-900 dark:border-gray-700 dark:text-white/90
          dark:focus:border-brand-800
        `}
      >
        <span className={value ? "" : "text-gray-400 dark:text-white/40"}>
          {selectedLabel || placeholder}
        </span>

        {/* ARROW */}
        <svg
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          } text-gray-400`}
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5 7l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* DROPDOWN */}
      {isOpen && (
        <div
          className="absolute z-50 mt-2 w-full rounded-lg
          border border-gray-200 bg-white shadow-lg
          dark:border-gray-700 dark:bg-gray-900"
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                setValue(option.value);
                onChange(option.value);
                setIsOpen(false);
              }}
              className="
                flex justify-between px-4 py-2 text-sm cursor-pointer
                hover:bg-gray-100 dark:hover:bg-gray-800
              "
            >
              <span>{option.label}</span>

              {value === option.value && (
                <span className="text-brand-500 font-bold">✔</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;