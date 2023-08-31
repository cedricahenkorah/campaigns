import React from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex gap-x-3 items-center">
      <div className="lg:w-[480px] w-full relative bg-white rounded-lg border-2">
        <div className="absolute inset-y-0 left-0 flex items-center pl-2 lg:pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          className="block w-full p-2 pl-8 lg:pl-10 bg-inherit border-b-2 border-x-0 focus:ring-0 border-t-0 border-white focus:outline-none focus:border-white text-black font-light placeholder-gray-400 bg-white rounded-lg placeholder:text-xs"
          placeholder="Search by campaign title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-lg border-green-700 border bg-white text-green-700 text-sm font-semibold px-3 py-2 md:py-3">
        Search
      </div>
    </div>
  );
};

export default Search;
