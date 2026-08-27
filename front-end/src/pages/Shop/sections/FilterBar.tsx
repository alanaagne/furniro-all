import { useState } from "react";

import filterIcon from "@assets/filter.svg";
import ballsIcon from "@assets/balls.svg";
import framesIcon from "@assets/frames.svg";

interface FilterBarProps {
  currentPage?: number;
  itemsPerPage?: number;
  totalItems?: number;
  onItemsPerPageChange?: (count: number) => void;
  onSortChange?: (sortBy: string) => void;
  onFilterClick?: () => void;
  onViewChange?: (view: "grid" | "list") => void;
}

export function FilterBar({
  currentPage = 1,
  itemsPerPage = 16,
  totalItems = 32,
  onItemsPerPageChange,
  onSortChange,
  onFilterClick,
  onViewChange,
}: FilterBarProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showCount, setShowCount] = useState<number>(itemsPerPage);
  const [sortBy, setSortBy] = useState<string>("Default");

  const showingFrom = totalItems === 0 ? 0 : (currentPage - 1) * showCount + 1;
  const showingTo = Math.min(currentPage * showCount, totalItems);

  const handleViewChange = (mode: "grid" | "list") => {
    setViewMode(mode);
    onViewChange?.(mode);
  };

  const handleShowCountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rawValue = e.target.value;

    if (rawValue === "") {
      setShowCount(1);
      onItemsPerPageChange?.(1);
      return;
    }

    const val = Number(rawValue);

    if (!Number.isNaN(val)) {
      const sanitizedValue = Math.max(1, Math.floor(val));
      setShowCount(sanitizedValue);
      onItemsPerPageChange?.(sanitizedValue);
    }
  };

  const handleSortChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const val = e.target.value;
    setSortBy(val);
    onSortChange?.(val);
  };

  return (
    <section className="w-full bg-[#F9F1E7] min-h-[100px] flex items-center justify-center px-3 sm:px-4 lg:px-16 py-4">
      <div className="w-full max-w-[1240px] flex flex-col lg:flex-row items-center justify-between gap-5">

        <div className="w-full lg:w-auto flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-5">

          <button
            onClick={onFilterClick}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer text-black hover:opacity-75 transition-opacity"
          >
            <img
              src={filterIcon}
              alt="Filter"
              className="w-5 h-5 sm:w-6 sm:h-6 lg:w-[25px] lg:h-[25px]"
            />
            <span className="font-poppins text-base sm:text-lg lg:text-[20px]">
              Filter
            </span>
          </button>

          <button
            onClick={() => handleViewChange("grid")}
            className={`transition-opacity ${
              viewMode === "grid"
                ? "opacity-100"
                : "opacity-50 hover:opacity-100"
            }`}
          >
            <img
              src={ballsIcon}
              alt="Grid View"
              className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7"
            />
          </button>

          <button
            onClick={() => handleViewChange("list")}
            className={`transition-opacity ${
              viewMode === "list"
                ? "opacity-100"
                : "opacity-50 hover:opacity-100"
            }`}
          >
            <img
              src={framesIcon}
              alt="List View"
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
          </button>

          <div className="hidden sm:block h-8 w-[2px] bg-[#9F9F9F]" />

          <span className="font-poppins text-sm sm:text-base text-center">
            Showing {showingFrom}–{showingTo} of {totalItems} results
          </span>
        </div>

        <div className="w-full lg:w-auto flex flex-wrap items-center justify-center gap-4 sm:gap-6">

          <div className="flex items-center gap-2 sm:gap-4">
            <label
              htmlFor="show-input"
              className="font-poppins text-base sm:text-lg lg:text-[20px]"
            >
              Show
            </label>

            <input
              id="show-input"
              type="number"
              inputMode="numeric"
              min="1"
              step="1"
              value={showCount}
              onChange={handleShowCountChange}
              onKeyDown={(e) => {
                if (["e", "E", "+", "-", "."].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-white text-[#9F9F9F] font-poppins text-base sm:text-lg text-center focus:outline-none focus:ring-1 focus:ring-[#B88E2F] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <label
              htmlFor="sort-select"
              className="font-poppins text-base sm:text-lg lg:text-[20px] whitespace-nowrap"
            >
              Sort by
            </label>

            <select
              id="sort-select"
              value={sortBy}
              onChange={handleSortChange}
              className="w-36 sm:w-44 lg:w-[188px] h-12 sm:h-14 bg-white text-[#9F9F9F] font-poppins text-sm sm:text-base lg:text-[20px] px-3 focus:outline-none focus:ring-1 focus:ring-[#B88E2F]"
            >
              <option value="Default">Default</option>
              <option value="Price: Low to High">
                Price: Low to High
              </option>
              <option value="Price: High to Low">
                Price: High to Low
              </option>
              <option value="Newest">Newest</option>
            </select>
          </div>

        </div>
      </div>
    </section>
  );
}