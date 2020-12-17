import React from 'react';
import styled from "styled-components";

const InputDiv = styled.div`
  position: relative;
  background-color: #FFFFFF;
  border-radius: 3px;
`;

const StyledInput = styled.input`
  font-size: 14px;
  background-color: transparent;
  border: 1px solid #D6D6D6;
  width: 100%;
  z-index: 1;
  position: relative;
  border-radius: 7px;
  padding: 12px;
  outline: none;
`;

const TextField = ({value, ...props}) => {
    if (!value) value = '';
    return (
        <InputDiv>
            <StyledInput
                isInputEmpty={value.length === 0}
                value={value}
                {...props} />
        </InputDiv>
    );
};


export default TextField;
