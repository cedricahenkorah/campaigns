import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { CgNotes } from "react-icons/cg";
import Modal from "../components/Modal";
import { useCampaignsContext } from "../hooks/useCampaignsContext";
import { Sentry } from "react-activity";
import "react-activity/dist/library.css";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const Customers = () => {
  const [showModal, setShowModal] = useState(false);
  const { campaigns, dispatch } = useCampaignsContext();
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalItems = campaigns?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = campaigns?.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchCampaigns = async (e) => {
      setIsLoading(true);

      const response = await fetch(
        "https://campaigns-server.onrender.com/api/campaigns"
      );

      const json = await response.json();
      console.log(json);

      if (response.ok) {
        dispatch({ type: "GET_CAMPAIGNS", payload: json });
      }

      setIsLoading(false);
    };

    fetchCampaigns();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="py-5 px-5 lg:px-20 xl:px-60">
        <h1 className="text-base lg:text-lg font-semibold">Customers</h1>
        <p className="text-xs lg:text-sm text-gray-400">
          See all your customers in one place
        </p>

        <div className="flex items-center gap-x-5 border-b-2 pt-5">
          <p>Customer Log</p>

          <div className="border-b-black border-b-2 p-2 font-semibold">
            Campaigns
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-x-5 py-5">
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
                placeholder="Search customer log by customer name, email address & phone number"
                required
              />
            </div>

            <div className="rounded-lg border-green-700 border bg-white text-green-700 text-sm font-semibold px-3 py-2 md:py-3">
              Search
            </div>
          </div>

          <button
            className="border-2 flex justify-center items-center md:justify-between gap-x-2 py-2 md:py-3 md:px-5 px-3 rounded-lg bg-green-800 mt-3 md:mt-0"
            onClick={() => setShowModal(true)}
          >
            <CgNotes color="white" size={20} />

            <div className="flex flex-col">
              <p className="font-semibold text-sm text-white">
                Create a campaign
              </p>
            </div>
          </button>
        </div>

        {/* table */}
        <div className="pb-5">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {campaigns && !isLoading && campaigns?.length > 0 ? (
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-black uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-black">
                      Campaign Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">Description</div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">Target Group</div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">Campaign Status</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="font-semibold">
                  {itemsToShow?.map((campaign) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={campaign._id}
                    >
                      <th scope="row" className="px-6 py-4">
                        {campaign?.title}
                      </th>
                      <td className="px-6 py-4 line-clamp-1">
                        {campaign?.description}
                      </td>
                      <td className="px-6 py-4">{campaign?.target}</td>
                      <td className="px-6 py-4">{campaign?.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : isLoading ? (
              <div className="flex justify-center py-5">
                <Sentry size={50} color="green" />
              </div>
            ) : (
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-black uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-black">
                      Campaign Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">Description</div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">Target Group</div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">Campaign Status</div>
                    </th>
                  </tr>
                </thead>
              </table>
            )}
          </div>
        </div>

        {/* pagination */}
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
      </div>

      {/* create a campaign modal */}
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default Customers;
