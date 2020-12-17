import React from "react";
import styled from 'styled-components';

const Wrapper = styled.div`
  background: #E5E5E5;
  min-height: 100vh;
  padding: 54px 80px;
`;



const PageWrapper = ({children}) => {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
};

export default PageWrapper
