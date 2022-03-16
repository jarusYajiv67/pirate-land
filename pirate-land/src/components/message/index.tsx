import React, {useState, useEffect} from 'react';
import {format} from 'timeago.js';
import axios from 'axios';

import {MessageContainer, Sender, Time, Msg, VrtclLn} from './styles';

import {useAPIContext} from '../../contexts/api.context';
import {useUserContext} from '../../contexts/user.context';

interface MessageProps {
  id: string;
  message: string;
  sender_id: string;
}

const Message: React.FC<MessageProps> = ({id, message, sender_id}) => {
    const {REST_API} = useAPIContext();
    const {token, id: uid} = useUserContext();
    const [name, setName] = useState<string>('-------');
    useEffect(() => {
      axios.post(`${REST_API}/users/name`, {userId: sender_id}, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache"
        },
      }).then(({data}) => setName(data.name))
      .catch(console.log);
    }, [sender_id]);
    
    return (
      <MessageContainer>
        <Sender>{uid === sender_id ? "You" : name}</Sender>
        <Msg>{message}</Msg>
        <Time>{format(id)}</Time>
        <VrtclLn />
      </MessageContainer>
    );
};

export default Message;
