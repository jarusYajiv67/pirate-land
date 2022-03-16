import styled from "styled-components";

import sendIcon from "../../assets/icons/send.png";

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #e8a57b;
  border-radius: 1px;
  gap: 0.1rem;
  padding: 0.1rem;
`;

export const InputBox = styled.textarea.attrs({
  placeholder: "Message...",
})`
  width: 100%;
  background-color: #e8a57b;
  border: none;
  font-family: bahnschrift;
  font-size: 2.1vh;
  opacity: 0.9;
  resize: none;
  &:focus {
    border: none;
    outline: none;
  }
`;

interface si {
  disabled: boolean;
}

export const SendIcon = styled.img.attrs<si>({
  src: sendIcon,
  alt: "",
})`
  width: 14%;
  height: auto;
  cursor: pointer;
  ${(props: si) => props.disabled && `opacity: 0.5; cursor: not-allowed;`}
`;