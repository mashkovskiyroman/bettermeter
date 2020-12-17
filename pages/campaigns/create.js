import React from "react";
import HeaderBlock from "../../components/header/Header";
import Menu from "../../components/navigation/Menu";
import CampaignPage from "../../components/page/CampaignPage";

const CreateCampaignPage = () => {
  return(
    <div>
      <HeaderBlock/>
      <Menu/>
      <CampaignPage campaign={null}/>
    </div>
  );
};

export default CreateCampaignPage
