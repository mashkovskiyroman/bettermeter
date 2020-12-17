import React, {useEffect, useState} from "react";
import HeaderBlock from "../../../components/header/Header";
import Menu from "../../../components/navigation/Menu";
import CampaignPage from "../../../components/page/CampaignPage";
import {fetcher} from "../../../utils/helpers";
import config from "../../../config";
import io from 'socket.io-client'

const PageCampaign = (props) => {
  const {error, campaign, host, id} = props;
  const [notificationShowed, setNotificationShowed] = useState(false);

  useEffect(() => {
    if (error) return () => {};
    const socket = io();
    socket.emit(`connect_to_edit_campaign`, {id});
    socket.on(`edit_campaign`, ({message}) => {
      if (!notificationShowed) {
        setNotificationShowed(true);
        alert(message)
      }
    });

    return () => {
      socket.emit(`disconnect_from_edit_campaign`, {id});
      socket.off('edit_campaign');
    }
  }, [id, error, notificationShowed]);

  return(
    <div>
      <HeaderBlock/>
      <Menu/>
      {error && (<div>{error.message}</div>)}
      {campaign && (<CampaignPage campaign={campaign}/>)}
    </div>
  );
};

PageCampaign.getInitialProps = async (ctx) => {
  const id = ctx ? ctx.query.id : null;
  const {error, data: campaign} = id ? await fetcher(`${config.host}/api/campaigns/${id}`) : {data: null};
  return  {error, campaign, id};
};

export default PageCampaign
