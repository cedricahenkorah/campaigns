import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { CgNotes } from "react-icons/cg";
import Modal from "../components/Modal";
import { useCampaignsContext } from "../hooks/useCampaignsContext";
import View from "../components/View";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import Search from "../components/Search";

const Customers = () => {
  const [showModal, setShowModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { campaigns, dispatch } = useCampaignsContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 10;
  const totalItems = campaigns?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredCampaigns = campaigns?.filter((campaign) =>
    campaign?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const itemsToShow = campaigns?.slice(startIndex, endIndex);
  const itemsToShow = filteredCampaigns?.slice(startIndex, endIndex);

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

      if (!response.ok) {
        setError(json.message);
        setIsLoading(false);
      }

      setIsLoading(false);
    };

    fetchCampaigns();
  }, [dispatch]);

  const handleViewCampaign = (campaignDetail) => {
    setSelectedCampaign(campaignDetail);
    setOpenModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="py-5 px-5 md:px-10 lg:px-20 xl:px-60">
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
          {/* search input */}
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

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
        <Table
          filteredCampaigns={filteredCampaigns}
          isLoading={isLoading}
          itemsToShow={itemsToShow}
          handleViewCampaign={handleViewCampaign}
          error={error}
        />

        {/* pagination */}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>

      {/* create a campaign modal */}
      <Modal showModal={showModal} setShowModal={setShowModal} />

      {/* view a campaign modal */}
      <View
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectedCampaign={selectedCampaign}
      />
    </div>
  );
};

export default Customers;
