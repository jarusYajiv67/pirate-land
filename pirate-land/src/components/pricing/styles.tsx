import styled from "styled-components";

export const PricingSection = styled.div`
  position: absolute;
  bottom: 2%;
  right: 2%;
  z-index: 999;
`;

export const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* width: 100vw; */
  /* height: 100vh; */
  z-index: 997;
`;

export const Title = styled.span`
  font-family: calibri;
  font-size: 5.6vh;
  color: #e7e4e1;
  color: black;
`;

export const PlansContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-top: 1rem;
`;

export const VerticalLine = styled.span`
  border-left: 3px solid #e61d30;
  border-radius: 2rem;
  height: 80%;
`;

export const PlanContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #ffe5c0;
  border: 2.1px dashed black;
  border-radius: 7px;
  gap: 0.7rem;
`;

export const PlanTitle = styled.span`
  font-family: bahnschrift;
  font-size: 4.2vh;
  color: black;
  align-self: center;
`;

export const Plan = styled.span`
  font-family: calibri;
  font-size: 3.0vh;
  color: black;
`;

export const Wrapper = styled.div`
  background-color: #e8a57b;
  padding: 1rem;
  padding-bottom: 1rem;
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2.4px dashed black;
  border-radius: 7px;
`;

export const Caption = styled.span`
  margin-top: 1rem;
  font-size: 2.4vh;
`;
