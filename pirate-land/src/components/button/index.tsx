import React from 'react';
import styled from 'styled-components';

interface BtnProps {
  btnType: number;
  disabled?: boolean;
}

const ButtonContainer = styled.div`
    font-family: 'PirateKids';
    cursor: pointer;
    padding: 0.4rem;
    font-size: 1.4rem;
    padding-top: 1px;
    padding-bottom: 1px;
    text-align: center;
    border-radius: 0.2rem;
    background-color: #e61d30;
    color: #354b7d;
    ${(props: BtnProps) => props.btnType === 2 && (
        `
          background-color: #354b7d;
          color: #e61d30;
        `
    )}
    ${(props: BtnProps) => props.disabled && `opacity: 0.5; cursor: not-allowed;`}
`;

interface ButtonProps {
  text: string;
  variant?: number;
  onPress: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({text, variant = 1, onPress, disabled = false}) => {
    return (
        <ButtonContainer onClick={onPress} btnType={variant} disabled={disabled}>
          {text}
        </ButtonContainer>
    );
}

export default Button;
