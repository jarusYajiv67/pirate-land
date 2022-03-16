import React, { Dispatch, SetStateAction, ChangeEvent } from 'react';

import {InputContainer, InputLabel, StyledInput} from './styles';

interface InputProps {
    label: string;
    name: string;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    isPass?: boolean;
}

const Input: React.FC<InputProps> = ({label, name, value, setValue, isPass}) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);
    return (
        <InputContainer>
          <InputLabel>{label}</InputLabel>
          <StyledInput type={isPass ? "password": "text"} name={name} value={value} onChange={handleChange} />
        </InputContainer>
    );
};

export default Input;