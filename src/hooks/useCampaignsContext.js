import { useContext } from "react";
import { CampaignsContext } from "../context/CampaignsContext";

export const useCampaignsContext = () => {
  const context = useContext(CampaignsContext);

  if (!context) {
    throw Error(
      "useCampaignsContext must be used inside the CamapaignsContextProvider"
    );
  }

  return context;
};
