import { Sentry } from "react-activity";
import "react-activity/dist/library.css";

const Table = ({
  filteredCampaigns,
  isLoading,
  itemsToShow,
  handleViewCampaign,
  error,
}) => {
  return (
    <div className="pb-5">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {filteredCampaigns && !isLoading && filteredCampaigns?.length > 0 ? (
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
                  onClick={() => handleViewCampaign(campaign)}
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
        ) : error && !isLoading ? (
          <>
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
            <div className="flex justify-center py-5 text-green-800 font-semibold">
              {error}
            </div>
          </>
        ) : (
          !isLoading &&
          !error && (
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
          )
        )}
      </div>
    </div>
  );
};

export default Table;
