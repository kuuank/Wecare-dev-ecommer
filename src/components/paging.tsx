import React, { useState } from "react";

interface PaginationButtonProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  children,
  isActive = false,
  onClick,
}) => {
  const baseClasses =
    "px-4 py-2.5 mx-1.5 text-sm border border-t border-r border-b border-l border-solid cursor-pointer";
  const activeClasses = "text-white bg-zinc-800 border-zinc-800";
  const inactiveClasses = "bg-white border-zinc-800 text-zinc-800";

  return (
    <button
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

interface NavigationButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  children,
  onClick,
  ariaLabel,
}) => {
  return (
    <button
      aria-label={ariaLabel}
      className="px-5 py-2.5 mx-1.5 text-sm text-white border-white cursor-pointer bg-zinc-800 border-[none]"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

interface PaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <PaginationButton
          key={i}
          isActive={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PaginationButton>
      );
    }
    return buttons;
  };

  return (
    <nav
      className="flex justify-center items-center my-5"
      aria-label="Pagination"
    >
      <NavigationButton ariaLabel="Previous Page" onClick={handlePrevClick}>
        &lt; Prev
      </NavigationButton>
      <div className="flex justify-center items-center">
        {renderPageButtons()}
      </div>
      <NavigationButton ariaLabel="Next Page" onClick={handleNextClick}>
        Next &gt;
      </NavigationButton>
    </nav>
  );
};

export default Pagination;
