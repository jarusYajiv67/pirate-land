import React, {createContext, useContext, useState, useEffect} from "react";
import axios from "axios";

import {usePlayContext} from './play.context';
import {useUserContext} from './user.context';
import {useAPIContext} from './api.context';
import {useSocketContext} from '../contexts/socket.context';
import {getDateObj} from '../utils/timeuuid-to-date';

export interface Message {
    id: string;
    message: string;
    sender_id: string;
}

interface TeamChatContextInterface {
  messages: Array<Message>;
  page: string | null;
  resetTeamChat?: () => void;
  fetchMessages?: () => void;
  sendMessage?: (msg: string) => void;
}

const defautState: TeamChatContextInterface = {
  messages: [],
  page: "",
};

export const TeamChatContext = createContext<TeamChatContextInterface>(defautState);

export const useTeamChatContext = () => useContext(TeamChatContext);

export const TeamChatContextProvider: React.FC = ({children}) => {
    const {currTeamId} = usePlayContext();
    const {socket} = useSocketContext();
    const {setLoading, token} = useUserContext();
    const {REST_API} = useAPIContext();
    const [messages, setMessages] = useState<Array<Message>>(defautState.messages);
    const [page, setPage] = useState<string | null>(defautState.page);
    
    const resetTeamChat = () => {
        setMessages([]);
        setPage('');
    };

    const fetchMessages = () => {
        if (page === null) return;
        setLoading!(true);
        const reqBody: {chatId: string; page?: string} = {chatId: currTeamId};
        if (page?.length) reqBody.page = page;
        axios.post(`${REST_API}/messages/by_chat_id`, {...reqBody}, {
          headers: {Authorization: `Bearer ${token}`,}
        }).then(({data}) => {
            setMessages([...messages, ...data.messages]);
            setPage(data.pageState);
            setLoading!(false);
        }).catch(() => setLoading!(false));
    };

    const sendMessage = (msg: string) => {
        if (!msg.length) return;
        const reqBody: {chatId: string; msg: string} = {chatId: currTeamId, msg};
        axios.post(`${REST_API}/messages/new`, {...reqBody}, {
          headers: {Authorization: `Bearer ${token}`,}
        }).then(({data}) => {
            const msgToAdd = {...data};
            msgToAdd.id = getDateObj(msgToAdd.id).toISOString();
            socket?.emit("updtTmChat", {roomId: currTeamId, msgObj: msgToAdd});
            setMessages([msgToAdd, ...messages]);
        }).catch(() => ({}));
    };

    useEffect(() => {
        socket?.on("updtTmChat", obj => {
            setMessages([obj, ...messages]);
        });
    }, [messages, socket, setMessages]);

    return (
        <TeamChatContext.Provider value={{
            messages, page,
            resetTeamChat, fetchMessages, sendMessage
        }}>{children}</TeamChatContext.Provider>
    );
};
