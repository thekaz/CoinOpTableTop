import React from 'react';
import styled from '@emotion/styled';
import { defaultButtonStyle, MAX_HP } from '../utils/CONSTANTS';

interface PROPS {
    hp: number;
    modifyHpCallback: (delta: number) => void;
}

const StyledPlusMinusButton = styled.button`
    ${defaultButtonStyle}
    cursor: ${({ disabled }) => disabled ? null : 'pointer'};
    visibility: ${({ disabled }) => disabled ? 'hidden' : null};
`;

const StyledHpBox = styled.div`
    display: inline-flex;
`;

const StyledHpContainer = styled.div`
    display: inline-flex;
    min-width: 70px;
    border: 1px solid white;
    margin-right: 8px;
    margin-left: 8px;
`;

function HpArea({hp, modifyHpCallback}: PROPS) {
    const hpArray = Array.apply(null, Array(hp));
    const missingHpArray = Array.apply(null, Array(MAX_HP - hp));

    const disablePlus = hp >= MAX_HP;
    const disableMinus = hp <= 0;
    return <div>
        <div>
            HP:
        </div>
        <StyledPlusMinusButton
            onClick={() => modifyHpCallback(-1)}
            disabled={disableMinus}>-</StyledPlusMinusButton>
        <StyledHpContainer>
            {hpArray.map((_, idx) => <StyledHpBox key={idx}>&#9646;</StyledHpBox>)}
            {missingHpArray.map((_, idx) => <StyledHpBox key={idx}>&#9647;</StyledHpBox>)}
        </StyledHpContainer>
        <StyledPlusMinusButton 
            onClick={() => modifyHpCallback(1)} 
            disabled={disablePlus}>+</StyledPlusMinusButton> 
    </div>
};

export default HpArea