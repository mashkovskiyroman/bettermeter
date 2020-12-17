import React, {useEffect, useState} from "react";
import Link from 'next/link';
import styled from 'styled-components';
import PageWrapper from "../../components/page/PageWrapper";
import PageContent from "../../components/page/PageContent";
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import dynamic from "next/dynamic";
import BaseButton from "../../components/common/BaseButton";
import InputField from "../../components/common/InputField";
import {testCampaign} from "../../assets/dummy";
import {useRouter} from 'next/router'
import {fetcher} from "../../utils/helpers";

const  AceEditor = dynamic(
  () => import('../../components/AceEditorComponent'),
  { ssr: false }
);

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 56px;
`;

const PageTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const PageTitle = styled.div`
  font-weight: bold;
  font-size: 36px;
  color: #000;
`;
const PageSubTitle = styled.div`
  padding-left: 25px;
  padding-top: 4px;
  font-size: 20px;
`;

const AddNewCampaignButton = styled(BaseButton)`
  width: 267px;
  height: 65px;
  padding: 0 24px;
  font-size: 20px;
  background-color: #101010;
  color: #fff;
  
`;

const SettingsPanel = styled.div`
  display: flex;
  align-items: center;
  padding: 47px 39px 47px 60px;
`;

const EditHeaderSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const EditHeaderSectionTitle = styled.div`
  padding-top: 5px;
  font-size: 24px;
  font-weight: bold;
`;
const EditHeaderSectionControls = styled.div`
  display: flex;
`;
const ControlIcon = styled.div`
  display: flex;
  align-items: center;
  width: 45px;
  margin-right: 20px;
  cursor: pointer;
  &:hover {
    color: #08A90E;
  }
`;
const CancelButton = styled(BaseButton)`
  width: 230px;
  height: 55px;
  padding: 0 22px;
  font-size: 20px;
  background-color: #F9F8F6;
  color: #84868A;
  margin-right: 20px;
`;
const SaveChangesButton = styled(BaseButton)`
  width: 230px;
  height: 55px;
  padding: 0 22px;
  font-size: 20px;
  background-color: #08A90E;
  color: white;
`;

const ActivePanel = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 60px 100px;
`;
const ActivePanelLabel = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  color: #939598;
  padding-bottom: 30px;
`;
const ActiveItemsWrapper = styled.div`
  display: flex;
`;
const ActiveItem = styled.div`
  position:relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  margin-right: 22px;
  font-size: 36px;
  color: #FFFFFF;
  background-color: ${({active, color}) => active ? color : '#D6D6D6'};
  &:hover {
    cursor: pointer;
    & > .activate-tooltip {
      display: block;
    }
  }
`;

const Tooltip = styled.div`
  position: absolute;
  display: none;
  text-align: center;
  top: -40px;
  left: 10px;
  width: 80px;
  height: 25px;
  border-radius: 5px;
  background-color: black;
  font-size: 14px;
  &:before {
    position: absolute;
    top: 20px;
    left: 35px;
    content: '';
    border: 5px solid black;
    transform: rotate(-45deg);
    border-right-color: transparent;
    border-top-color: transparent;
  }
`;

const ActiveLabel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #08A90E;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InfoPanel = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 60px;
`;
const InfoPanelItem = styled.div`
  display: flex;
  position:relative;
`;
const InfoPanelItemLabel = styled.label`
  display: flex;
  font-size: 21px;
  & > span {
    padding-top: 7px;
  }
  & > div {
    margin-left: 30px;
  }
`;
const TagsPanel = styled.div`
  width: 100%;
  display: flex;
  padding: 42px 174px;
`;
const TagsPanelLabel = styled.div`
  font-size: 20px;
  padding-right: 37px;
`;
const TagsPanelItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 15px;
  margin-right: 10px;
  background-color: #3DDDAA;
  border-radius: 100px;
  .close-button {
    padding-left: 10px;
    font-size: x-large;
  }
`;

const Hr = styled.div`
  width: 100%;
  height: 1px;
  padding-top: 17px;
  border-bottom: 1px solid #E5E5E5; 
`;

const CodePanel = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 82px 50px 70px;
`;

const CodePanelHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-bottom: 38px;
`;
const CodePanelHeaderLabel = styled.div`
  padding-top: 8px;
  font-size: 24px;
  font-weight: bold;
`;
const CodePanelButtonsWrapper = styled.div`
  display: flex;
`;
const CodePanelButton = styled(BaseButton)`
  width: ${({type}) => type === 'preview' ? '174px' : '143px'};
  height: 55px;
  padding: ${({type}) => type === 'preview' ? '0 17px' : '0 22px'};
  font-size: 20px;
  background-color: ${({type}) => type === 'preview' ? '#1B7FF3' : '#08A90E'};
  color: white;
`;
const AceEditorWrapper = styled.div`
  .ace_scroller {
    padding: 0 15px;
    background-color: #F9F8F6;
    border: 1px solid #E5E5E5;
    border-radius: 0 10px 10px 0;
    border-left: 0;
  }
  .ace-github .ace_gutter {
    padding-top: 0;
    background-color: #FFFFFF;
    border: 1px solid #E5E5E5;
    border-radius: 10px 0 0 10px;
  }
`;

const PreviewPanel = styled.div`
  padding: 0 60px 100px;
`;
const PreviewPanelHeader = styled.div`
  font-size: 24px;
  font-weight: bold;
  padding-bottom: 50px;
`;
const CampaignPreview = styled.div``;

const ValidationError = styled.div`
  color: red;
  position: absolute;
  right: 0;
  bottom: -20px;
`;

const activeItems = [
  {id: 1, label: 'DS', color: '#3290FD', active: true},
  {id: 2, label: 'DK', color: '#3DDDAA', active: true},
  {id: 3, label: 'GL', color: '#FF9900', active: true},
  {id: 4, label: 'NB', color: '', active: false},
  {id: 5, label: 'DV', color: '', active: false},
  {id: 6, label: '3D', color: '', active: false},
  {id: 7, label: 'CP', color: '', active: false},
]
const tags = [{id: 1, name: 'blackfriday'}, {id: 2, name: 'sale'}];

const CampaignPage = (props) => {
  const router = useRouter();
  const {id} = router.query;
  const {campaign, host} = props;

  const mode = id ? 'edit' : 'create';
  const [errors, setErrors] = useState([]);
  const [code, setCode] = useState(campaign ? campaign.code : testCampaign);
  const [campaignName, setCampaignName] = useState(campaign ? campaign.name : '');
  const [destinationUrl, setDestinationUrl] = useState(campaign ? campaign.destination : '');
  const [campaignType, setCampaignType] = useState(campaign ? campaign.type : '');

  useEffect(() => {
    if (campaign) {
      setCode(campaign.code);
      setCampaignName(campaign.name);
      setDestinationUrl(campaign.destination);
      setCampaignType(campaign.type);
    }
  }, [campaign]);

  const formValid = () => {
    const validationErrors = [];
    if (!campaignName) validationErrors.push('name');
    if (!destinationUrl) validationErrors.push('destination');
    if (!campaignType) validationErrors.push('type');
    setErrors(validationErrors);
    return !validationErrors.length;
  };

  const hasError = (field) => {
    return errors.includes(field);
  };

  const saveCampaign = async () => {
    if (!formValid()) return;
    const {error, data} = await fetcher(`${host}/api/campaigns`, {
        method: 'POST',
        body: JSON.stringify({
          code,
          name: campaignName,
          destination: destinationUrl,
          type: campaignType,
        }),
      });
    if (error) alert(error.message);
    else {
      alert('Campaign successfully created!');
      await router.push(`/campaigns/${data.recordId}`);
    }
  };

  const updateCampaign = async () => {
    if (!formValid()) return;
    const {error, data} = await fetcher(`${host}/api/campaigns/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        code,
        name: campaignName,
        destination: destinationUrl,
        type: campaignType,
      }),
    });
    if (error) alert(error.message);
    else {
      alert('Campaign successfully updated!')
    }
  };

  return(
    <PageWrapper>
        <PageHeader>
          <PageTitleWrapper>
            <PageTitle>Campaign</PageTitle>
            <PageSubTitle>This is a place for a sub-text as explaination of the page.</PageSubTitle>
          </PageTitleWrapper>
          {mode === 'edit' && (
            <Link href={'/campaigns/create'}>
              <AddNewCampaignButton>
                <AddOutlinedIcon />
                <span>Add New Campaign</span>
              </AddNewCampaignButton>
            </Link>
          )}
        </PageHeader>
        <PageContent>
          <SettingsPanel>
            <EditHeaderSection>
              <EditHeaderSectionTitle>
                {mode === 'edit' ? 'Edit Campaign' : 'Create Campaign'}
              </EditHeaderSectionTitle>
              {mode === 'edit' && (
                <EditHeaderSectionControls>
                  <ControlIcon> </ControlIcon>
                  <ControlIcon><VisibilityOutlinedIcon /></ControlIcon>
                  <ControlIcon><EditOutlinedIcon /></ControlIcon>
                  <ControlIcon><DeleteForeverOutlinedIcon /></ControlIcon>
                  <CancelButton onClick={async () => {await router.push('/campaigns')}}>
                    <span>Cancel</span>
                    <CloseOutlinedIcon />
                  </CancelButton>
                  <SaveChangesButton onClick={updateCampaign}>
                    <span>Save Changes</span>
                    <CheckOutlinedIcon />
                  </SaveChangesButton>
                </EditHeaderSectionControls>
              )}
            </EditHeaderSection>
          </SettingsPanel>
          <ActivePanel>
            <ActivePanelLabel>Active on</ActivePanelLabel>
            <ActiveItemsWrapper>
              {activeItems.map((item) => (
                <ActiveItem key={item.id} color={item.color} active={item.active}>
                  {item.label}
                  {item.active && (<ActiveLabel><CheckOutlinedIcon /></ActiveLabel>)}
                  <Tooltip className={'activate-tooltip'}>
                    Activate
                  </Tooltip>
                </ActiveItem>
              ))
              }
            </ActiveItemsWrapper>
          </ActivePanel>
          <InfoPanel>
            <InfoPanelItem>
              <InfoPanelItemLabel>
                <span>Campaign Name</span>
                <InputField value={campaignName} onChange={({target}) => {setCampaignName(target.value)}}/>
              </InfoPanelItemLabel>
              {hasError('name') && (<ValidationError>Campaign name is required</ValidationError>)}
            </InfoPanelItem>
            <InfoPanelItem>
              <InfoPanelItemLabel>
                <span>Destination Url</span>
                <InputField value={destinationUrl} onChange={({target}) => {setDestinationUrl(target.value)}}/>
              </InfoPanelItemLabel>
              {hasError('destination') && (<ValidationError>Destination Url is required</ValidationError>)}
            </InfoPanelItem>
            <InfoPanelItem>
              <InfoPanelItemLabel>
                <span>Campaign Type</span>
                <InputField value={campaignType} onChange={({target}) => {setCampaignType(target.value)}}/>
              </InfoPanelItemLabel>
              {hasError('type') && (<ValidationError>Campaign type is required</ValidationError>)}
            </InfoPanelItem>
          </InfoPanel>
          <TagsPanel>
            <TagsPanelLabel> Tags </TagsPanelLabel>
            {tags.map((tag) => (
              <TagsPanelItem key={tag.id}>
                {tag.name}
                <CloseOutlinedIcon className={'close-button'} />
              </TagsPanelItem>
            ))
            }
          </TagsPanel>
          <Hr />
          <CodePanel>
            <CodePanelHeader>
              <CodePanelHeaderLabel>
                Code
              </CodePanelHeaderLabel>
              <CodePanelButtonsWrapper>
                <CodePanelButton type={'preview'} style={{marginRight: '20px'}}>
                  <VisibilityOutlinedIcon />
                  <span>Live Preview</span>
                </CodePanelButton>
                <CodePanelButton type={'publish'} onClick={saveCampaign}>
                  <CheckCircleOutlineIcon />
                  <span>Publish</span>
                </CodePanelButton>
              </CodePanelButtonsWrapper>
            </CodePanelHeader>
            <AceEditorWrapper>
              <AceEditor value={code} onChange={(value) => setCode(value)}/>
            </AceEditorWrapper>
          </CodePanel>
          <PreviewPanel>
            <PreviewPanelHeader>
              Preview
            </PreviewPanelHeader>
            <CampaignPreview dangerouslySetInnerHTML={{__html: code}}/>
          </PreviewPanel>
        </PageContent>
      </PageWrapper>
  );
};

export default CampaignPage
