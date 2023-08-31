import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <div className="flex justify-end items-center">
      <button
        className="mr-2"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <BsArrowLeft color="gray" />
      </button>
      {[currentPage - 1, currentPage, currentPage + 1]
        .filter((pageNumber) => pageNumber > 0 && pageNumber <= totalPages)
        .map((pageNumber) => (
          <button
            key={pageNumber}
            className={`px-3 py-1 rounded-full mx-1 ${
              currentPage === pageNumber
                ? "bg-green-800 text-white"
                : "bg-white text-green-800"
            }`}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      <button
        className="ml-2"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <BsArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
