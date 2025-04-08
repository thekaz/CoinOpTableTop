import React from 'react';
import { TFLIP_RESULTS } from '../utils/CONSTANTS';
import styled from '@emotion/styled';

type TPROPS = {
    flipResults: TFLIP_RESULTS
}

const StyledFlipResultSpan = styled.span<{auto: boolean}>`
    border: ${( { auto }) => auto ? '1px solid white': 'none'};
`;

function CoinFlipResults( {flipResults}: TPROPS) {
    return <>{(Object.keys(flipResults) as any).map((key: keyof TFLIP_RESULTS) => 
        <div key={key}>{flipResults[key] === null ?
            "__" : 
                <StyledFlipResultSpan auto={!!flipResults[key]?.auto}>{flipResults[key]?.pass ? '✔️' : '❌'}</StyledFlipResultSpan>
        }</div>
    )}</>
}

export default CoinFlipResults;