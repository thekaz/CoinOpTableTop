import React from 'react';
import { ISTATS, orderedStatsList, statsLabelLookup } from '../CONSTANTS';
import styled from '@emotion/styled';

interface IPROPS {
    stats: ISTATS
}

const StyledTH = styled.th`
    width: 20px
`;

const dcList = [1,2,3,4,5,6,7];

function CoinFlipArea({stats}: IPROPS) {
    return <>
        <table>
            <thead>
                <tr>
                    <StyledTH>1</StyledTH>
                    <StyledTH>2</StyledTH>
                    <StyledTH>3</StyledTH>
                    <StyledTH>4</StyledTH>
                    <StyledTH>5</StyledTH>
                    <StyledTH>6</StyledTH>
                    <StyledTH>7</StyledTH>
                </tr>
            </thead>
        </table>
        <div>
            <label>Skill</label>
            <select>
                {orderedStatsList.map((stat) => <option value={stat}>{statsLabelLookup.get(stat)}</option>)}
            </select>
        </div>
        <div>
            <label>DC</label>
            <select>
                {dcList.map((dc) => <option value={dc}>{dc}</option>)}
            </select>
        </div>
        
        <button>Flip</button>
    </>
}

export default CoinFlipArea;