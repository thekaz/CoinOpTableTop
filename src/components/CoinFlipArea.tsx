import React, { useEffect, useRef, useState } from 'react';
import { TSTATS, orderedStatsList, statsLabelLookup, TSTAT, DEFAULT_FLIP_RESULTS, TFLIP_RESULTS } from '../CONSTANTS';
import styled from '@emotion/styled';
import { collateResults, doFlip, TFLIP_RETURN } from '../utils/coinflip';

interface TPROPS {
    stats: TSTATS
}

const StyledTH = styled.th`width: 20px`;

const dcList = [1,2,3,4,5,6,7];

function CoinFlipArea({stats}: TPROPS) {
    const flipResultsRef = useRef(DEFAULT_FLIP_RESULTS);
    const setSkillCheckDcRef = useRef(1);
    const [modStat, setModStat] = useState('combat' as TSTAT);
    const [flippingState, setFlippingState] = useState(false);
    const [flipResults, setFlipResults] = useState(DEFAULT_FLIP_RESULTS);
    const [overallPassResult, setOverallPassResult] = useState(null as boolean | null);
    const [skillCheckDc, setSkillCheckDc] = useState(1);

    useEffect(() => {
        flipResultsRef.current = flipResults;
        setSkillCheckDcRef.current = skillCheckDc;
    }, [flipResults, skillCheckDc]);

    const loopFlips = (modifier: number, count: number = 0)=> {
        if (count >= 7) {
            setFlippingState(false);
            setOverallPassResult(collateResults(flipResultsRef.current) >= setSkillCheckDcRef.current);
            return;
        }
        setTimeout(() => {
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

    return <>
        {overallPassResult === null ? null : <div>{overallPassResult ? 'PASSED!!' : 'FAILED!!'}</div>}
        <table>
            <thead>
                <tr>
                    {flipResultsKeys.map((key: keyof TFLIP_RESULTS) => 
                        <StyledTH>{flipResults[key] === null ? key : `${flipResults[key]?.auto ? 'auto' : ''} ${flipResults[key]?.pass ? 'pass' : 'fail'}`}</StyledTH>)}
                </tr>
            </thead>
        </table>
        <div>
            <label>Skill</label>
            <select onChange={(e) => setModStat(e.target.value as TSTAT)}>
                {orderedStatsList.map((stat) => <option value={stat} key={stat}>{statsLabelLookup.get(stat)}</option>)}
            </select>
        </div>
        <div>
            <label>DC</label>
            <select onChange={(e) => setSkillCheckDc(parseInt(e.target.value))}>
                {dcList.map((dc) => <option value={dc} key={dc}>{dc}</option>)}
            </select>
        </div>
        
        <button disabled={flippingState} onClick={flipButtonCallback}>Flip</button>
    </>
}

export default CoinFlipArea;