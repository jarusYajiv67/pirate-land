import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Input from '../input';
import Button from '../button';
import {ColTitle} from '../rooms-form';

import {useUserContext} from '../../contexts/user.context';
import {useAPIContext} from '../../contexts/api.context';

const AccountsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
`;

interface UpdateFormProps {}

const UpdateForm: React.FC<UpdateFormProps> = () => {
    const {id, token, setLoading} = useUserContext();
    const {REST_API} = useAPIContext();

    const [name, setName] = useState<string>('');
    const [name1, setName1] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    const hasChanged: boolean = (name.length > 0 && name !== name1) || password.length > 0;

    const onUpdate = () => {
      if (!hasChanged) return;
      setLoading!(true);
      const requestBody: {id: string, name?: string, password?: string} = {id};
      if (name !== name1) requestBody.name = name;
      if (password.length > 0) requestBody.password = password;
      axios.put(`${REST_API}/users/update`, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setName1(name);
        setPassword('');
        setLoading!(false);
      }).catch(err => {
        setLoading!(false);
        window.alert(JSON.stringify(err.response.data));
      });
    };

    useEffect(() => {
      setLoading!(true);
      axios.post(`${REST_API}/users/name`, {userId: id}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({data}) => {
        setName(data.name);
        setName1(data.name);
        setLoading!(false);
      }).catch(err => {
        setLoading!(false);
        window.alert(JSON.stringify(err.response.data));
      });
    }, []);

    return (
      <AccountsContainer>
        <ColTitle>Update Account</ColTitle>
        <Input label="Name" name="name" value={name} setValue={setName} />
        <Input
          label="Password"
          name="password"
          value={password}
          setValue={setPassword}
          isPass
        />
        <Button
          disabled={!hasChanged}
          variant={2}
          text="Update"
          onPress={onUpdate}
        />
      </AccountsContainer>
    );
};

export default UpdateForm;
