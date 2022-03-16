import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Input from '../input';
import Button from '../button';

import {useAPIContext} from '../../contexts/api.context';
import {useUserContext} from '../../contexts/user.context';

const LoginContainer = styled.div`
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

const LoginForm: React.FC<LoginFormProps> = () => {
    const {REST_API} = useAPIContext();
    const {setLoading, setId, setToken, setCurrentGame} = useUserContext();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    const onLogin = () => {
      if (!username.length || !password.length)
        return window.alert('Fields empty');
      setLoading!(true);
      axios.post(`${REST_API}/auth/login`, {username, password})
      .then(({data}) => {
        setId!(data.id as string);
        setToken!(data.token as string);
        setCurrentGame!(data.currentGame as string);
        setLoading!(false);
      })
      .catch((err) => {
        window.alert(JSON.stringify(err.response.data));
        setLoading!(false);
      });
    };
    
    return (
        <LoginContainer>
          <FormTitle>Login</FormTitle>
          <Input value={username} setValue={setUsername} label='Username' name='username' />
          <Input isPass value={password} setValue={setPassword} label='Password' name='password' />
          <Button onPress={onLogin} text='Login' />
        </LoginContainer>
    );
};

export default LoginForm;
