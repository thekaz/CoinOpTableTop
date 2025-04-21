import React, { useEffect, useRef, useState } from 'react';
import { CHECK_CHAR, CROSS_CHAR, TFLIP_RESULTS } from '../utils/CONSTANTS';
import styled from '@emotion/styled';

type TPROPS = {
    flipResults: TFLIP_RESULTS
}

const StyledFlipResultSpan = styled.span<{locked: boolean}>`
    border: ${( { locked }) => locked ? '1px solid white': 'none'};
`;

function CoinFlipResults( {flipResults}: TPROPS) {
    const isInProgressCrossRef = useRef(false);
    const intervalId = useRef(null as NodeJS.Timer | null);
    const [isInProgressCross, setInProgressCross] = useState(false);
    
    // Create an animation timer for coin flip
    useEffect(() => {
        intervalId.current = setInterval(() => {
            isInProgressCrossRef.current = !isInProgressCrossRef.current;
            setInProgressCross(isInProgressCrossRef.current);
        }, 20);

        return () => {
            if (intervalId.current) {
                clearInterval(intervalId.current)
            }
        }
    }, [setInProgressCross]);

    return <>{(Object.keys(flipResults) as any).map((key: keyof TFLIP_RESULTS) => 
        <div key={key}>{flipResults[key] === null ?
            "__" : 
                <StyledFlipResultSpan locked={!flipResults[key]?.inProgress}>{
                    flipResults[key]?.inProgress ? 
                    isInProgressCross ? CROSS_CHAR : CHECK_CHAR
                    : flipResults[key]?.pass ? CHECK_CHAR : CROSS_CHAR
                }</StyledFlipResultSpan>
        }</div>
    )}</>
}

export default CoinFlipResults;