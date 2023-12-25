import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import React from "react";

const Pagination = ({ page, pageSize, count, clickBack, clickForward }) => {
  const pages = Math.ceil(count / pageSize);

  return (
    !isNaN(pages) &&
    pages !== 0 && (
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={clickBack}
          disabled={page === 1}
          className="cursor-pointer rounded-xl bg-cherry p-2 text-cream hover:bg-cherry-hover disabled:cursor-not-allowed disabled:bg-cherry-disabled"
        >
          <AiOutlineArrowLeft size="1.5rem" />
        </button>
        <div>
          {page} z {pages}
        </div>
        <button
          type="button"
          onClick={clickForward}
          disabled={page === pages}
          className="cursor-pointer rounded-xl bg-cherry p-2 text-cream hover:bg-cherry-hover disabled:cursor-not-allowed disabled:bg-cherry-disabled"
        >
          <AiOutlineArrowRight size="1.5rem" />
        </button>
      </div>
    )
  );
};

export default Pagination;
