import React, {useState, ChangeEvent} from 'react';

import {InputContainer, SendIcon, InputBox} from './styles';

interface MessageInputProps {
  onPress: (val: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({onPress}) => {
    const [text, setText] = useState<string>('');
    
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => setText(event.target.value);
    
    return (
      <InputContainer>
        <InputBox value={text} onChange={handleChange} />
        <SendIcon onClick={() => {onPress(text); setText('');}} disabled={text.length < 1} />
      </InputContainer>
    );
};

export default MessageInput;
