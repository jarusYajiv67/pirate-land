import styled from 'styled-components';

export const InputContainer = styled.div`
  width: 100%;
  display: grid;
`;

export const InputLabel = styled.label`
  font-family: 'bahnschrift';
  font-size: 1.2rem;
  opacity: 0.84;
`;

export const StyledInput = styled.input`
  background-color: #e8a57b;
  outline: none;
  border: 2.1px solid #354b7d;
  border-radius: 0.3rem;
  padding: 3px;
  font-size: 1.2rem;
  height: 1.8rem;
  
  &:focus {
    border: 2.1px dashed #354b7d;
  }
`;