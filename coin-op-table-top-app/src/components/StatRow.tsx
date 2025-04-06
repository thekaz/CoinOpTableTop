import React, {useState} from 'react';
import { STATS, statsLabelLookup } from '../CONSTANTS';
import styled from '@emotion/styled';

type Props = {
    statName: keyof STATS;
    statValue: number;
    statUpdateFunction: (statToUpdate: keyof STATS, newStatValue: number) => void;
    writeMode: boolean;
}

const StyledDiv = styled.div`margin:2px;`;
const StyledNameSpan = styled.span`width:100px`;
const StyledInput = styled.input`background: none;border:1px solid white; color:white`;

function StatRow( {statName, statValue, statUpdateFunction, writeMode }: Props) {
    const statLabel = statsLabelLookup.get(statName);
    return (
        <StyledDiv>
            {writeMode ?
            <span>
                <label>{statLabel}: </label>
                <StyledInput 
                    width={2} 
                    type="number"
                    onChange={(e) => {statUpdateFunction(statName, parseInt(e.target.value || ''))}}
                    value={statValue}
                />
            </span> : 
            <><StyledNameSpan><label>{statLabel}: </label></StyledNameSpan><span><label>{statValue}</label></span></>
            }
        </StyledDiv>
    )
}

export default StatRow;