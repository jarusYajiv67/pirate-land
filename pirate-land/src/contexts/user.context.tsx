import React, {createContext, useContext, useState} from 'react';

interface UserContextInterface {
  id: string;
  token: string;
  loading: boolean;
  currentGame: string;
  setId?: (val: string) => void;
  setToken?: (val: string) => void;
  setLoading?: (val: boolean) => void;
  setCurrentGame?: (val: string) => void;
}

const defaultState: UserContextInterface = {
    id: '',
    token: '',
    currentGame: '',
    loading: false,
};

export const UserContext = createContext<UserContextInterface>(defaultState);

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider: React.FC = ({children}) => {
    const [id, setId] = useState<string>(defaultState.id);
    const [token, setToken] = useState<string>(defaultState.token);
    const [loading, setLoading] = useState<boolean>(defaultState.loading);
    const [currentGame, setCurrentGame] = useState<string>(defaultState.currentGame);
    return (
      <UserContext.Provider
        value={{
          id,
          token,
          loading,
          currentGame,
          setId,
          setToken,
          setLoading,
          setCurrentGame,
        }}
      >
        {children}
      </UserContext.Provider>
    );
};