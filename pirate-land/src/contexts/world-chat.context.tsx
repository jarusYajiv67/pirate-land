import React, {createContext, useContext, useState, useEffect} from "react";
import axios from "axios";

import {useLobbyContext} from './lobby.context';
import {useUserContext} from './user.context';
import {useAPIContext} from './api.context';
import {useSocketContext} from '../contexts/socket.context';
import {getDateObj} from '../utils/timeuuid-to-date';

export interface Message {
  id: string;
  message: string;
  sender_id: string;
}

interface WorldChatContextInterface {
  messages: Array<Message>;
  page: string | null;
  resetWorldChat?: () => void;
  fetchMessages?: () => void;
  sendMessage?: (msg: string) => void;
}

const defautState: WorldChatContextInterface = {
  messages: [],
  page: "",
};

export const WorldChatContext = createContext<WorldChatContextInterface>(defautState);

export const useWorldChatContext = () => useContext(WorldChatContext);

export const WorldChatContextProvider: React.FC = ({children}) => {
    const {id: worldId} = useLobbyContext();
    const {socket} = useSocketContext();
    const {setLoading, token} = useUserContext();
    const {REST_API} = useAPIContext();
    const [messages, setMessages] = useState<Array<Message>>(defautState.messages);
    const [page, setPage] = useState<string | null>(defautState.page);
    
    const resetWorldChat = () => {
        setMessages([]);
        setPage('');
    };

    const fetchMessages = () => {
        if (page === null) return;
        setLoading!(true);
        const reqBody: {chatId: string; page?: string} = {chatId: worldId};
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
        const reqBody: {chatId: string; msg: string} = {chatId: worldId, msg};
        axios.post(`${REST_API}/messages/new`, {...reqBody}, {
          headers: {Authorization: `Bearer ${token}`,}
        }).then(({data}) => {
            const msgToAdd = {...data};
            msgToAdd.id = getDateObj(msgToAdd.id).toISOString();
            socket?.emit("updtWldChat", {roomId: worldId, msgObj: msgToAdd});
            setMessages([msgToAdd, ...messages]);
        }).catch(() => ({}));
    };

    useEffect(() => {
        socket?.on("updtWldChat", (obj) => {
          setMessages([obj, ...messages]);
        });
    }, [messages, socket, setMessages]);

    return (
        <WorldChatContext.Provider value={{
            messages, page,
            resetWorldChat, fetchMessages, sendMessage
        }}>{children}</WorldChatContext.Provider>
    );
};