import React, {useState} from 'react';
import { STATS } from '../CONSTANTS';
import styled from '@emotion/styled';

type Props = {
    statName: keyof STATS;
    statValue: number;
    statUpdateFunction: (statToUpdate: keyof STATS, newStatValue: number) => void;
    writeMode: boolean;
}

const StyledDiv = styled.div`margin:2px;`;
const StyledInput = styled.input`background: none;border:1px solid white; color:white`;

function StatRow( {statName, statValue, statUpdateFunction, writeMode }: Props) {
    return (
        <StyledDiv>
            {writeMode ? <span><label>{statName}: </label><label>{statValue}</label></span> :
            <span>
                <label>{statName}: </label>
                <StyledInput width={2} type="number" onChange={(e) => {statUpdateFunction(statName, parseInt(e.target.value))}} value={statValue}/>
            </span>}
        </StyledDiv>
    )
}

export default StatRow;