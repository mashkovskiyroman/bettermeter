import React from "react";
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const HeaderWrapper = styled.div`
  background: #101010;
`;
const LogoWrapper = styled.div`
  display: inline-block;
  color: #fff;
  padding: 17px 30px;
`;

const Logo = styled.img`
  vertical-align: middle;
`;

const HeaderMenu = styled.div`
  display: inline-block;
  float: right;
  color: #fff;
`;
const HeaderMenuItem = styled.div`
  display:inline-block;
  padding: 15px 20px;
  vertical-align: middle;
  text-align: center;
`;
const NotificationWrapper = styled(HeaderMenuItem)`
  display: inline-flex;
`;
const Notifications = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background-color: red;
  color: #FFFFFF;
  border-radius: 50%;
  margin-left: -10px;
  font-size: 12px;
  border: 3px solid #101010;
`;
const UserMenuItem = styled.div`
  display: inline-block;
  padding: 12px 20px;
  vertical-align: middle;
  text-align: center;
`;
const Avatar = styled.img`
  border-radius: 50%;
  margin-right: 10px;
  vertical-align: middle;
`;
const UserName = styled.div`
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
`;
const StyledExpandMoreIcon = styled(ExpandMoreIcon)`
  vertical-align: middle;
  margin: 0 5px;
`;

const Header = () => {
    return (
        <HeaderWrapper>
            <LogoWrapper>
                <Logo src={'/static/logo.svg'} alt="BetterMeter"/>
            </LogoWrapper>
            <HeaderMenu>
                <HeaderMenuItem>
                    <SearchIcon />
                </HeaderMenuItem>
                <NotificationWrapper>
                    <NotificationsIcon />
                    <Notifications>9</Notifications>
                </NotificationWrapper>
                <UserMenuItem>
                    <Avatar src={'/static/avatar.png'} alt="BetterMeter"/>
                    <UserName>Adrian Villa</UserName>
                    <StyledExpandMoreIcon/>
                </UserMenuItem>
            </HeaderMenu>
        </HeaderWrapper>
    );
};

export default Header
