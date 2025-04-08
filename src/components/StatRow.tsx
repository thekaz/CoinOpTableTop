import React from 'react';
import { TSTATS, statsLabelLookup, MIN_STATS, MAX_STATS, defaultButtonStyle } from '../utils/CONSTANTS';
import styled from '@emotion/styled';

interface TPROPS {
    statName: keyof TSTATS;
    statValue: number;
    availablePoints: number;
    increaseStatCallback: (statToUpdate: keyof TSTATS) => void;
    decreaseStatCallback: (statToUpdate: keyof TSTATS) => void;
    writeMode: boolean;
}

const StyledPlusMinusButton = styled.button`
    ${defaultButtonStyle}
    cursor: ${({ disabled }) => disabled ? null : 'pointer'};
    visibility: ${({ disabled }) => disabled ? 'hidden' : null};
`;

const StyledDiv = styled.div`height: 32px;`

function StatRow( {statName, statValue, availablePoints, increaseStatCallback, decreaseStatCallback, writeMode }: TPROPS) {
    const statLabel = statsLabelLookup.get(statName);
    const disablePlus = statValue >= MAX_STATS || availablePoints <= 0;
    const disableMinus = statValue <= MIN_STATS;
    return (
        <>
            <StyledDiv>
                <label>{statLabel}: </label>
            </StyledDiv>
            <StyledDiv>
                <label>{statValue > 0 ? `+${statValue}` : statValue}</label>
            </StyledDiv>
            <StyledDiv>
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
        </>
    )
}

export default StatRow;