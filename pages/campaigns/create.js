import React from "react";
import HeaderBlock from "../../components/header/Header";
import Menu from "../../components/navigation/Menu";
import CampaignPage from "../../components/page/CampaignPage";
import {getHost} from "../../utils/helpers";

const CreateCampaignPage = ({host}) => {
  return(
    <div>
      <HeaderBlock/>
      <Menu/>
      <CampaignPage campaign={null} host={host}/>
    </div>
  );
};

CreateCampaignPage.getInitialProps = async (ctx) => {
  const host = `https://${getHost(ctx)}`;
  return {host};
};

export default CreateCampaignPage
