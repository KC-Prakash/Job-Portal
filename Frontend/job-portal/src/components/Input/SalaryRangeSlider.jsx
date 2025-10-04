import { useState, useEffect } from "react";

const SalaryRangeSlider = ({ filters, handleFilterChange }) => {
  const [minSalary, setMinSalary] = useState(filters.minSalary ?? "");
  const [maxSalary, setMaxSalary] = useState(filters.maxSalary ?? "");

  // Sync with external changes
  useEffect(() => {
    setMinSalary(filters.minSalary ?? "");
    setMaxSalary(filters.maxSalary ?? "");
  }, [filters.minSalary, filters.maxSalary]);

  const handleBlur = () => {
    const min = minSalary !== "" ? parseInt(minSalary, 10) : null;
    const max = maxSalary !== "" ? parseInt(maxSalary, 10) : null;

    // Prevent min > max
    if (min !== null && max !== null && min > max) {
      handleFilterChange("minSalary", max);
      handleFilterChange("maxSalary", min);
      setMinSalary(max);
      setMaxSalary(min);
    } else {
      handleFilterChange("minSalary", min);
      handleFilterChange("maxSalary", max);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Min Salary */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min Salary:
          </label>
          <input
            type="number"
            placeholder="0"
            min="0"
            step="1000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={minSalary}
            onChange={({ target }) => setMinSalary(target.value)}
            onBlur={handleBlur}
          />
        </div>

        {/* Max Salary */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Salary:
          </label>
          <input
            type="number"
            placeholder="No Limit"
            min="0"
            step="1000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={maxSalary}
            onChange={({ target }) => setMaxSalary(target.value)}
            onBlur={handleBlur}
          />
        </div>
      </div>

      {/* Display current range */}
      {(minSalary || maxSalary) && (
        <div className="text-sm text-gray-600 bg-gray-100 p-2 rounded-md">
          Range:{" "}
          {minSalary
            ? `$${parseInt(minSalary, 10).toLocaleString()}`
            : "$0"}{" "}
          -{" "}
          {maxSalary
            ? `$${parseInt(maxSalary, 10).toLocaleString()}`
            : "No Limit"}
        </div>
      )}
    </div>
  );
};

export default SalaryRangeSlider;
