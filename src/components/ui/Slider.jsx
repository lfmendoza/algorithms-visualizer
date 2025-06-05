import React from "react";

const Slider = ({ value, onChange, min, max, label, disabled = false }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}: {value}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 disabled:opacity-50"
      />
    </div>
  );
};

export default Slider;
