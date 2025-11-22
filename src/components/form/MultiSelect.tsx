import type React from "react";
import { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  text: string;
}

interface MultiSelectProps {
  label: string;
  options: Option[];
  defaultSelected?: string[];
  onChange?: (selected: string[]) => void;
  disabled?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  defaultSelected = [],
  onChange,
  disabled = false,
}) => {
  const [selectedOptions, setSelectedOptions] =
    useState<string[]>(defaultSelected);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const handleSelect = (value: string) => {
    const updated = selectedOptions.includes(value)
      ? selectedOptions.filter((v) => v !== value)
      : [...selectedOptions, value];

    setSelectedOptions(updated);
    onChange?.(updated);
  };

  const removeOption = (value: string) => {
    const updated = selectedOptions.filter((v) => v !== value);
    setSelectedOptions(updated);
    onChange?.(updated);
  };

  const selectedValuesText = selectedOptions.map(
    (value) => options.find((o) => o.value === value)?.text || ""
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  // close dropdown when clicking outside
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, []);

  return (
    <div className="w-full">
      <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-400">
        {label}
      </label>

      <div ref={dropdownRef} className="w-full">
        {/* INPUT BOX */}
        <div
          className="flex min-h-11 h-auto w-full cursor-pointer items-center justify-between rounded-lg border border-gray-300 bg-white py-1.5 pl-3 pr-3 shadow-sm dark:bg-gray-900 dark:border-gray-700"
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown();
          }}
        >
          <div className="flex flex-wrap gap-2 flex-auto">
            {selectedValuesText.length > 0 ? (
              selectedValuesText.map((text, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-sm text-gray-800 dark:bg-gray-800 dark:text-white/90"
                >
                  {text}
                  <span
                    className="cursor-pointer text-gray-500 hover:text-gray-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeOption(selectedOptions[index]);
                    }}
                  >
                    ✕
                  </span>
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-600 dark:text-white/70">
                Select option
              </span>
            )}
          </div>

          {/* Arrow */}
          <div className="ml-2">
            <svg
              className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M4.8 7.4L10 12.6L15.2 7.4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* DROPDOWN — NOT ABSOLUTE */}
        {isOpen && (
          <div className="mt-2 w-full rounded-lg border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 max-h-56 overflow-auto">
            {options.map((option) => (
              <div
                key={option.value}
                className="px-3 py-2 flex justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => handleSelect(option.value)}
              >
                <span className="text-gray-800 dark:text-white/90">
                  {option.text}
                </span>

                {selectedOptions.includes(option.value) && (
                  <span className="text-brand-500 font-bold">✔</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
