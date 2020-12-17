import React from "react";
import styled from 'styled-components';

const Content = styled.div`
  background: #fff;
  border-radius: 10px 10px 0 0;
  padding: 0;
`;



const PageContent = ({children}) => {
  return (
    <Content>
      {children}
    </Content>
  );
};

export default PageContent
