import React from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

import prettyDate from '../../utils/pretty-date';
import {getDateObj} from "../../utils/timeuuid-to-date";

export const RecordText = styled.div`
  font-family: bahnschrift;
  cursor: pointer;
  opacity: 0.84;
  display: flex;
  gap: 2.1rem;
  font-size: 0.8rem;
  &:hover {
    color: green;
  }
`;

export const Hrzntl = styled.div`
  border-top: 2px solid black;
  opacity: 0.6;
`;

interface RecordItemProps {
  id: string;
};

const RecordItem: React.FC<RecordItemProps> = ({id}) => {
    const navigate = useNavigate();
    
    const handleClick = () => navigate(`../island/${id}/scoreboard`);

    return (
      <>
        <RecordText onClick={handleClick}>
          <span>
            {prettyDate(
              getDateObj(id).toISOString()
            )}
          </span>
          <span>{id}</span>
        </RecordText>
        <Hrzntl />
      </>
    );
};

export default RecordItem;
