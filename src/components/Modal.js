import { CgNotes } from "react-icons/cg";
import { useCampaignsContext } from "../hooks/useCampaignsContext";
import { useState } from "react";
import { Sentry } from "react-activity";
import "react-activity/dist/library.css";

const Modal = ({ showModal, setShowModal }) => {
  const { dispatch } = useCampaignsContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCampaigns = async (e) => {
    setIsLoading(true);

    const response = await fetch(
      "https://campaigns-server.onrender.com/api/campaigns"
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "GET_CAMPAIGNS", payload: json });
    }

    setIsLoading(false);
  };

  // create a campaign
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const campaign = { title, description, target };

    const response = await fetch(
      "https://campaigns-server.onrender.com/api/campaigns",
      {
        method: "POST",
        body: JSON.stringify(campaign),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();
    console.log(json);

    if (!response.ok) {
      setError(json.message);
      setIsLoading(false);
    }

    if (response.ok) {
      setTitle("");
      setDescription("");
      setTarget("");
      setError(null);

      console.log("new campaign created", json);
      dispatch({ type: "CREATE_CAMPAIGN", payload: json });

      setIsLoading(false);

      fetchCampaigns();
      setShowModal(false);
    }
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-xl p-4 mx-auto bg-white rounded-md shadow-lg">
                <form
                  className="flex flex-col p-3 lg:p-5"
                  onSubmit={handleSubmit}
                >
                  {error && <p className="text-red-500 py-2">{error}</p>}

                  <div className="flex items-center gap-x-3">
                    <CgNotes size={20} />

                    <h1 className="text-base lg:text-lg font-semibold">
                      Create a campaign
                    </h1>
                  </div>

                  <div className="flex flex-col gap-y-3 pb-5 pt-10">
                    <div className="flex flex-col gap-y-1">
                      <label className="font-semibold">Campaign Title</label>
                      <input
                        type="text"
                        className="mb-2 lg:mb-5 mt-2 p-2 xl:px-3 rounded-md border border-gray-200 focus:border-blue-500 focus:outline-none"
                        placeholder="Write your campaign title here"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-y-1">
                      <label className="font-semibold">Description</label>
                      <textarea
                        placeholder="Write your message here"
                        cols="30"
                        rows="7"
                        className="mb-2 lg:mb-5 mt-2 p-2 xl:px-3 rounded-md border border-gray-200 focus:border-blue-500 focus:outline-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                      <p className="text-gray-400 text-right text-xs lg:text-sm">
                        Max: 100 words
                      </p>
                    </div>

                    <div className="flex flex-col gap-y-1">
                      <label className="font-semibold">Target group</label>
                      <select
                        className="mb-2 lg:mb-5 mt-2 p-2 lg:p-3 rounded-md border border-gray-200 focus:border-blue-500 focus:outline-none"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                      >
                        <option value="">Select your target group</option>
                        <option value="All customers">All Customers</option>
                      </select>
                    </div>
                  </div>

                  {!isLoading && (
                    <button className="border-2 py-3 px-5 rounded-lg bg-green-800 text-white">
                      Submit your comment
                    </button>
                  )}

                  {isLoading && (
                    <button
                      className="border-2 py-3 px-5 rounded-lg bg-green-800 text-white flex items-center gap-x-2"
                      disabled
                    >
                      <Sentry size={20} color="green" />
                      <p>Submitting...</p>
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
