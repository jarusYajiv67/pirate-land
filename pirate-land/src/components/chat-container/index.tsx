import React, {useEffect, useState} from 'react';

import Message from '../message';
import MessageInput from '../message-input';

import {useTeamChatContext, Message as MsgTyp} from '../../contexts/team-chat.context';
import {useWorldChatContext} from '../../contexts/world-chat.context';
import {usePlayContext} from '../../contexts/play.context';

import {ChatsContainer, ChatsTitle, LoadMore, MessagesContainer} from './styles';

interface ChatContainerProps {
    title: string;
    variant: number;
    gameId: string;
}

const ChatContainer: React.FC<ChatContainerProps> = ({title, variant, gameId}) => {
    const {messages: tmMsgs, fetchMessages, sendMessage, page} = useTeamChatContext();
    const {messages: wcMsgs, fetchMessages: fthWldMsg, sendMessage: sndWldMsg} = useWorldChatContext();
    const {currTeamId} = usePlayContext();
    const [initFtch, setInitFtch] = useState<boolean>(false);
    const idToChk: string = title === "Team Chat" ? currTeamId : gameId;
    const messages: Array<MsgTyp> = title === "Team Chat" ? tmMsgs : wcMsgs;

    useEffect(() => {
      if (!idToChk.length) return;
      if (initFtch) return;
      setInitFtch(true);
      if (title === "Team Chat") fetchMessages!();
      else fthWldMsg!();
    }, [idToChk, initFtch]);

    const toFetchMessages = title === "Team Chat" ? fetchMessages : fthWldMsg;

    const submitMessage = (text: string) => {
      if (title === "Team Chat") sendMessage!(text);
      else sndWldMsg!(text);
    }

    console.log({page});

    return (
      <ChatsContainer variant={variant}>
        <ChatsTitle variant={variant}>{title}</ChatsTitle>
        <MessagesContainer>
          {messages.map((data, idx) => (
            <Message key={idx} {...data} />
          ))}
          <LoadMore onClick={() => toFetchMessages!()}>LOAD MORE</LoadMore>
        </MessagesContainer>
        <MessageInput onPress={submitMessage} />
      </ChatsContainer>
    );
};

export default ChatContainer;
