import { ChevronDown, ChevronUp } from "lucide-react";
import { JOB_CATEGORIES, JOB_TYPES } from "../../../utils/data";
import SalaryRangeSlider from "../../../components/Input/SalaryRangeSlider";

const FilterSection = ({ title, children, isExpanded, onToggle }) => (
  <div className="border-b border-gray-200 pb-4 mb-4 last:border-b-0">
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full text-left font-semibold text-gray-900 hover:text-blue-600 transition-colors"
    >
      {title}
      {isExpanded ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
    </button>
    {isExpanded && children}
  </div>
);

const FilterContent = ({
  toggleSection,
  clearAllFilters,
  expandedSections,
  filters,
  handleFilterChange,
}) => {
const handleCheckboxChange = (key, value) => {
    const current = filters[key] || [];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    handleFilterChange(key, updated);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={clearAllFilters}
          className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
        >
          Clear All
        </button>
      </div>

      {/* Job Type */}
      <FilterSection
        title="Job Type"
        isExpanded={expandedSections.jobType}
        onToggle={() => toggleSection("jobType")}
      >
        <div className="space-y-3">
          {JOB_TYPES.map((type) => (
            <label key={type.value} className="flex items-center cursor-pointer gap-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500 focus:ring focus:ring-offset-0"
                checked={filters.type?.includes(type.value)}
                onChange={() => handleCheckboxChange("type", type.value)}
              />
              <span className="text-gray-700 text-sm">{type.value}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Salary Range */}
      <FilterSection
        title="Salary Range"
        isExpanded={expandedSections.salary}
        onToggle={() => toggleSection("salary")}
      >
        <SalaryRangeSlider filters={filters} handleFilterChange={handleFilterChange} />
      </FilterSection>

      {/* Category */}
      <FilterSection
        title="Category"
        isExpanded={expandedSections.categories}
        onToggle={() => toggleSection("categories")}
      >
        <div className="space-y-3">
          {JOB_CATEGORIES.map((category) => (
            <label key={category.value} className="flex items-center cursor-pointer gap-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500 focus:ring focus:ring-offset-0"
                checked={filters.category?.includes(category.value)}
                onChange={() => handleCheckboxChange("category", category.value)}
              />
              <span className="text-gray-700 text-sm">{category.value}</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </>
  );
};

export default FilterContent;
