import React from 'react';
import styled from 'styled-components';

const LoaderContainer = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.84);
  width: 100vw;
  height: 100vh;
  z-index: 999;
`;

const Loader = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
  &:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #ffe5c0;
    border-color: #e8a57b transparent #e8a57b transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Caption = styled.h1`
  color: white;
`;

interface BlockLoaderProps {}

const BlockLoader: React.FC<BlockLoaderProps> = () => {
    return (
      <LoaderContainer>
        <Loader />
        <Caption>Advertisement goes here</Caption>
      </LoaderContainer>
    );
};

export default BlockLoader;
