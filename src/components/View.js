const View = ({ openModal, setOpenModal, selectedCampaign }) => {
  return (
    <>
      {openModal ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setOpenModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-sm p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="py-5">
                  <p className="font-semibold text-center lg:text-xl text-green-800">
                    {selectedCampaign?.title}
                  </p>
                </div>

                <div className="space-y-6 flex px-5">
                  <div className="flex flex-col space-y-6">
                    <div className="flex flex-col gap-y-1">
                      <h1 className="font-semibold text-green-800">
                        Description
                      </h1>
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {selectedCampaign?.description}
                      </p>
                    </div>

                    <div className="flex flex-col gap-y-1">
                      <h1 className="font-semibold text-green-800">
                        Target group
                      </h1>
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {selectedCampaign?.target}
                      </p>
                    </div>

                    <div className="flex flex-col gap-y-1">
                      <h1 className="font-semibold text-green-800">Status:</h1>
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {selectedCampaign?.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default View;
