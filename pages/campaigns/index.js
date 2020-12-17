import React from "react";
import HeaderBlock from "../../components/header/Header";
import Menu from "../../components/navigation/Menu";
import Link from 'next/link'
import {fetcher, getHost} from "../../utils/helpers";

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
  const host = `https://${getHost(ctx)}`;
  const {error, data: campaigns} = await fetcher(`${host}/api/campaigns`);
  return  {error, campaigns};
};

export default Campaigns
