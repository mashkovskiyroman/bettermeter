import React from "react";
import HeaderBlock from "../../components/header/Header";
import Menu from "../../components/navigation/Menu";
import Link from 'next/link'
import {fetcher} from "../../utils/helpers";
import config from "../../config";

const Campaigns = (props) => {
  const {error, campaigns} = props;
    return(
      <div>
        <HeaderBlock/>
        <Menu/>
        {error && (<div>Failed to load campaigns</div>)}
        {!campaigns && !error && (<div>Loading...</div>)}
        {campaigns && (
          <ul>
            {campaigns.map((campaign) => (
              <li key={campaign.id}>
                <Link href="/campaigns/[id]" as={`/campaigns/${campaign.id}`}>
                  <a>{`Campaign ${campaign.id}`}</a>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
};

Campaigns.getInitialProps = async (ctx) => {
  const {error, data: campaigns} = await fetcher(`${config.host}/api/campaigns`);
  return  {error, campaigns};
};

export default Campaigns
