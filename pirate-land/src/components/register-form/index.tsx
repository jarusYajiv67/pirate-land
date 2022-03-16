import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Input from '../input';
import Button from '../button';

// contexts
import {useAPIContext} from '../../contexts/api.context';
import {useUserContext} from '../../contexts/user.context';

const RegisterContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
`;

const FormTitle = styled.span`
  font-family: 'calibri';
  font-size: 4.9vh;
  opacity: 0.84;
`;

interface LoginFormProps {}

const sleep = () => new Promise((resolve) => setTimeout(resolve, 3000));

const RegisterForm: React.FC<LoginFormProps> = () => {
    const {REST_API} = useAPIContext();
    const {setLoading} = useUserContext();
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    const onRegister = async () => {
      if (!name.length || !username.length || !password.length)
        return window.alert("Filed is empty");
      setLoading!(true);
      await sleep();
      axios
        .post(`${REST_API}/users/create`, { name, username, password })
        .then(() => {
          window.alert("Account has been created successfully");
          setName("");
          setUsername("");
          setPassword("");
          setLoading!(false);
        })
        .catch((err) => {
          window.alert(JSON.stringify(err.response.data));
          setLoading!(false);
        });
    };

    return (
        <RegisterContainer>
          <FormTitle>Register</FormTitle>
          <Input value={name} setValue={setName} label='Name' name='name' />
          <Input value={username} setValue={setUsername} label='Username' name='username' />
          <Input value={password} setValue={setPassword} label='Password' name='password' />
          <Button onPress={onRegister} text='Create' variant={2} />
        </RegisterContainer>
    );
};

export default RegisterForm;
