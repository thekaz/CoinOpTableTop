import React, { useCallback, useEffect, useRef, useState } from 'react';
import { 
    TSTATS, 
    orderedStatsList, 
    statsLabelLookup, 
    TSTAT, 
    DEFAULT_FLIP_RESULTS, 
    TFLIP_RESULTS, 
    defaultButtonStyle, 
    defaultSelectStyle,
    BLANK_CHAR,
    CHECK_CHAR,
    CROSS_CHAR,
    DC_LIST,
    challengeRatingLabelLookup,
    TDC,
} from '../utils/CONSTANTS';
import styled from '@emotion/styled';
import { collateResults, doFlip, TFLIP_RETURN } from '../utils/coinflip';
import CoinFlipResults from './CoinFlipResults';

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

const StyledWrapperDiv = styled.div`padding-bottom:16px;`;

const StyledGridContainerDiv = styled.div`display: grid; grid-template-columns: repeat(7, 60px);`;

const StyledSelectDiv = styled.div`
    display: flex;
    align-items: center;
`;

const StyledOption = styled.option`
    background: inherit;
`;

const StyledResultDiv = styled.div`height: 32px;`;

function CoinFlipArea({stats}: TPROPS) {
    const flipResultsRef = useRef(DEFAULT_FLIP_RESULTS);
    const skillCheckDcRef = useRef(0 as TDC);
    const flipTimeoutRef = useRef(0 as unknown);
    const [modStat, setModStat] = useState('combat' as TSTAT);
    const [flippingState, setFlippingState] = useState(false);
    const [flipResults, setFlipResults] = useState(DEFAULT_FLIP_RESULTS);
    const [overallPassResult, setOverallPassResult] = useState(null as boolean | null);
    const [skillCheckDc, setSkillCheckDc] = useState(0 as TDC);

    useEffect(() => {
        flipResultsRef.current = flipResults;
        skillCheckDcRef.current = skillCheckDc;
    }, [flipResults, skillCheckDc]);

    const loopFlips = useCallback((modifier: number, count: number = 0)=> {
        const flipReturn: TFLIP_RETURN = doFlip(modifier);
        const newFlipResults: TFLIP_RESULTS = {
            ...flipResultsRef.current,
            [count]: flipReturn.result,
        }
        setFlipResults(newFlipResults);

        const collatedResults = collateResults(newFlipResults);
        const alreadyFinished = collatedResults >= skillCheckDcRef.current ||
            collatedResults + 6 - count < skillCheckDcRef.current;

        if (skillCheckDcRef.current && collatedResults >= skillCheckDcRef.current) {
            setOverallPassResult(true);
        }

        if (skillCheckDcRef.current && collatedResults + 6 - count < skillCheckDcRef.current) {
            setOverallPassResult(false);
        }

        if (count >= 6) {
            setFlippingState(false);
            if (!skillCheckDcRef.current) {
                setOverallPassResult(null);
            } else {
                setOverallPassResult(collatedResults >= skillCheckDcRef.current);
            }
            return;
        }

        setFlipResults({
            ...newFlipResults,
            [count+1] : {inProgress: true}
        });

        flipTimeoutRef.current = setTimeout(() => {
            loopFlips(flipReturn.modifier, count+1)
        }, modifier !== 0 || alreadyFinished ? 500 : 1000 + count * 500);
    }, []);

    const flipButtonCallback = useCallback(() => {
        setFlipResults(DEFAULT_FLIP_RESULTS);
        flipResultsRef.current = DEFAULT_FLIP_RESULTS;
        setFlippingState(true);
        setOverallPassResult(null);
        const modifier = stats[modStat];
        loopFlips(modifier);
    }, [flipResultsRef, setFlippingState, setOverallPassResult, loopFlips, stats, modStat]);

    const cancelButtonCallback = useCallback(() => {
        clearTimeout(flipTimeoutRef.current as number);
        setFlippingState(false);
        setOverallPassResult(null);
        setFlipResults(DEFAULT_FLIP_RESULTS);
        flipResultsRef.current = DEFAULT_FLIP_RESULTS;
    }, [flipTimeoutRef, setFlippingState, setOverallPassResult, setFlipResults, flipResultsRef]);

    const resultString = overallPassResult === null ? BLANK_CHAR : overallPassResult ? CHECK_CHAR : CROSS_CHAR;

    return <StyledWrapperDiv>
        <StyledResultDiv>Result: {resultString}</StyledResultDiv>
        <StyledGridContainerDiv>
           <CoinFlipResults flipResults={flipResults}/>
        </StyledGridContainerDiv>
        <StyledSelectDiv>
            <label>Skill:</label>
            <StyledSelect onChange={(e) => setModStat(e.target.value as TSTAT)}>
                {orderedStatsList.map((stat) => <StyledOption value={stat} key={stat}>{statsLabelLookup.get(stat)}</StyledOption>)}
            </StyledSelect>
        </StyledSelectDiv>
        <StyledSelectDiv>
            <label>Difficulty:</label>
            <StyledSelect onChange={(e) => setSkillCheckDc(parseInt(e.target.value) as TDC)}>
                {DC_LIST.map((dc) => <StyledOption value={dc} key={dc}>{challengeRatingLabelLookup.get(dc)}</StyledOption>)}
            </StyledSelect>
        </StyledSelectDiv>
        
        {flippingState ? 
            <StyledButton onClick={cancelButtonCallback}>Cancel</StyledButton> :
            <StyledButton onClick={flipButtonCallback}>Flip</StyledButton>
        }
    </StyledWrapperDiv>
}

export default CoinFlipArea;