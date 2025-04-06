import React from 'react';
import { ISTATS, statsLabelLookup, MIN_STATS, MAX_STATS } from '../CONSTANTS';
import styled from '@emotion/styled';

interface IPROPS {
    statName: keyof ISTATS;
    statValue: number;
    availablePoints: number;
    increaseStatCallback: (statToUpdate: keyof ISTATS) => void;
    decreaseStatCallback: (statToUpdate: keyof ISTATS) => void;
    writeMode: boolean;
}

const StyledDiv = styled.div`margin:2px;`;

const StyledPlusMinusButton = styled.button`
    background: none;
    color: inherit;
    border: 1px solid white;
    padding-right: 2px;
    padding-left: 2px;
    font: inherit;
    outline: inherit;
    margin-right: 2px;
    margin-left: 2px;
    cursor: ${({ disabled }) => disabled ? null : 'pointer'};
    visibility: ${({ disabled }) => disabled ? 'hidden' : null};
`;

function StatRow( {statName, statValue, availablePoints, increaseStatCallback, decreaseStatCallback, writeMode }: IPROPS) {
    const statLabel = statsLabelLookup.get(statName);
    const disablePlus = statValue >= MAX_STATS || availablePoints <= 0;
    const disableMinus = statValue <= MIN_STATS;
    return (
        <StyledDiv>
            <><label>{statLabel}: </label><label>{statValue}</label></>
            {writeMode &&
            <span>
                <StyledPlusMinusButton 
                    onClick={() => increaseStatCallback(statName)} 
                    disabled={disablePlus}>+</StyledPlusMinusButton> 
                <StyledPlusMinusButton
                    onClick={() => decreaseStatCallback(statName)}
                    disabled={disableMinus}>-</StyledPlusMinusButton>
            </span>
            }
        </StyledDiv>
    )
}

export default StatRow;