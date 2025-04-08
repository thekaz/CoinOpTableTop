import React, { useEffect, useRef, useState } from 'react';
import { 
    TSTATS, 
    orderedStatsList, 
    statsLabelLookup, 
    TSTAT, 
    DEFAULT_FLIP_RESULTS, 
    TFLIP_RESULTS, 
    defaultButtonStyle, 
    defaultSelectStyle
} from '../utils/CONSTANTS';
import styled from '@emotion/styled';
import { collateResults, doFlip, TFLIP_RETURN } from '../utils/coinflip';

interface TPROPS {
    stats: TSTATS
}

const StyledButton = styled.button`
    ${defaultButtonStyle}
    cursor: ${({ disabled }) => disabled ? null : 'pointer'};
    visibility: ${({ disabled }) => disabled ? 'hidden' : null};
`;

const StyledSelect = styled.select`
    ${defaultSelectStyle}
    margin-left: 8px;
`;

const StyledWrapperDiv = styled.div`padding:12px;`;

const StyledGridContainerDiv = styled.div`display: grid; grid-template-columns: repeat(7, 60px);`;

const StyledSelectDiv = styled.div`
    display: flex;
    align-items: center;
`;

const dcList = [1,2,3,4,5,6,7];

const StyledOption = styled.option`
    background: inherit;
`;

const StyledFlipResultSpan = styled.span<{auto: boolean}>`
    border: ${( { auto }) => auto ? '1px solid white': 'none'};
`;

const StyledResultDiv = styled.div`height: 32px;`;

function CoinFlipArea({stats}: TPROPS) {
    const flipResultsRef = useRef(DEFAULT_FLIP_RESULTS);
    const skillCheckDcRef = useRef(1);
    const timer = useRef<ReturnType<typeof setTimeout>>(null);
    const [modStat, setModStat] = useState('combat' as TSTAT);
    const [flippingState, setFlippingState] = useState(false);
    const [flipResults, setFlipResults] = useState(DEFAULT_FLIP_RESULTS);
    const [overallPassResult, setOverallPassResult] = useState(null as boolean | null);
    const [skillCheckDc, setSkillCheckDc] = useState(1);

    useEffect(() => {
        flipResultsRef.current = flipResults;
        skillCheckDcRef.current = skillCheckDc;
    }, [flipResults, skillCheckDc]);

    const loopFlips = (modifier: number, count: number = 0)=> {
        if (count >= 7) {
            timer.current && clearTimeout(timer.current);
            setFlippingState(false);
            setOverallPassResult(collateResults(flipResultsRef.current) >= skillCheckDcRef.current);
            return;
        }
        timer.current = setTimeout(() => {
            const flipReturn: TFLIP_RETURN = doFlip(modifier);
            const newFlipResults: TFLIP_RESULTS = {
                ...flipResultsRef.current,
                [count+1]: flipReturn.result,
            }
            setFlipResults(newFlipResults);
            loopFlips(flipReturn.modifier, count+1)
        }, modifier !== 0 ? 50 : 1000);
    };

    const flipButtonCallback = () => {
        setFlipResults(DEFAULT_FLIP_RESULTS);
        setFlippingState(true);
        setOverallPassResult(null);
        const modifier = stats[modStat];
        loopFlips(modifier);
    };

    const flipResultsKeys: Array<keyof TFLIP_RESULTS> = Object.keys(flipResults) as any;

    return <StyledWrapperDiv>
        <StyledResultDiv>Result: {overallPassResult === null ? "__" : overallPassResult ? '✔️' : '❌'}</StyledResultDiv>
        <StyledGridContainerDiv>
            {flipResultsKeys.map((key: keyof TFLIP_RESULTS) => 
                <div>{flipResults[key] === null ?
                    "__" : 
                        <StyledFlipResultSpan auto={!!flipResults[key]?.auto}>{flipResults[key]?.pass ? '✔️' : '❌'}</StyledFlipResultSpan>
                }</div>
            )}
        </StyledGridContainerDiv>
        <StyledSelectDiv>
            <label>Skill </label>
            <StyledSelect onChange={(e) => setModStat(e.target.value as TSTAT)}>
                {orderedStatsList.map((stat) => <StyledOption value={stat} key={stat}>{statsLabelLookup.get(stat)}</StyledOption>)}
            </StyledSelect>
        </StyledSelectDiv>
        <StyledSelectDiv>
            <label>Difficulty </label>
            <StyledSelect onChange={(e) => setSkillCheckDc(parseInt(e.target.value))}>
                {dcList.map((dc) => <StyledOption value={dc} key={dc}>{dc}</StyledOption>)}
            </StyledSelect>
        </StyledSelectDiv>
        
        <StyledButton disabled={flippingState} onClick={flipButtonCallback}>Flip</StyledButton>
    </StyledWrapperDiv>
}

export default CoinFlipArea;