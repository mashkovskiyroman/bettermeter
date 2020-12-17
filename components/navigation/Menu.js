import React from "react";
import Link from 'next/link';
import styled from 'styled-components';
import TvIcon from '@material-ui/icons/Tv';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import LanguageIcon from '@material-ui/icons/Language';
import DashboardIcon from '@material-ui/icons/Dashboard';
import OutlinedFlagIcon from '@material-ui/icons/OutlinedFlag';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const MenuWrapper = styled.div`
  background-color: #fff;
`;
const MenuComponent = styled.div`
  margin: 0;
  padding: 0 4px;
`;
const MenuItem = styled.div`
  display:inline-block;
  padding: 20px;
  font-family: 'DM Sans, sans-serif';
  font-size: 18px;
  color: ${({active}) => active ? 'white' : '#5D6677'};
  background-color: ${({active}) => active ? '#101010' : 'inherit'};
  cursor: pointer;
  &:hover {
    background-color: #101010;
    color: white;
  }
`;

const MenuItemWrapper = styled.div`
  position:relative;
  display: inline-block;
  
  &:hover {
    background-color: #101010;
    color: white;
    & > .sub-menu {
      display: block;
    }
  }
`;
const SubMenu = styled.div`
  position: absolute;
  display: none;
  background-color: #fff;
  border-radius: 0 0 5px 5px;
  min-width: 230px;
`;
const SubMenuItem = styled.div`
  padding: 20px;
  color: #5D6677;
  &:hover {
    cursor: pointer;
    background-color: #101010;
    color: white;
  }
  &:last-child {
    border-radius: 0 0 5px 5px;
  }
`;



const Menu = () => {
  const menuIconStyle = {
    verticalAlign: 'bottom',
    marginRight: '12px',
  };

  return (
      <MenuWrapper>
          <MenuComponent>
            <Link href={'/analytics'}>
              <MenuItem>
                  <DashboardIcon style={menuIconStyle} />
                  <span>Analytics</span>
              </MenuItem>
            </Link>
            <Link href={'/sites'}>
              <MenuItem>
                <LanguageIcon style={menuIconStyle} />
                <span>Sites</span>
              </MenuItem>
            </Link>
            <MenuItemWrapper>
              <Link href={'/campaigns'}>
                <MenuItem active={true}>
                  <FilterNoneIcon style={menuIconStyle} />
                  <span>Campaigns</span>
                </MenuItem>
              </Link>
              <SubMenu className={'sub-menu'}>
                <Link href={'/campaigns/create'}>
                  <SubMenuItem>
                    <OutlinedFlagIcon style={menuIconStyle} />
                    <span>Create campaign</span>
                  </SubMenuItem>
                </Link>
                <Link href={'/campaigns'}>
                  <SubMenuItem>
                    <EditOutlinedIcon style={menuIconStyle} />
                    <span>Manage campaign</span>
                  </SubMenuItem>
                </Link>
              </SubMenu>
            </MenuItemWrapper>
            <Link href={'/live-view'}>
              <MenuItem>
                <TvIcon style={menuIconStyle} />
                <span>Live View</span>
              </MenuItem>
            </Link>
          </MenuComponent>
      </MenuWrapper>
  );
}

export default Menu
