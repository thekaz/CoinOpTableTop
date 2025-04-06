import React, {useState, useCallback} from 'react';
import { STATS } from '../CONSTANTS';
import StatRow from './StatRow';
import statValidate from '../utils/statValidate';
import styled from '@emotion/styled';

type StatsArray = Array<keyof STATS>;
const orderedStatsList: StatsArray = [
    'combat',
    'coordination',
    'constitution',
    'cognition',
    'commonSense',
    'cooperation'
];

const StyledDiv = styled.div`padding:12px;`

function StatsBlock() {
    const [inWriteMode, setWriteMode] = useState(false);
    const defaultStats: STATS = {
        combat: 0,
        coordination: 0,
        constitution: 0,
        cognition: 0,
        commonSense: 0,
        cooperation: 0,
    };
    const [stats, setStats] = useState(defaultStats);

    const setSingleStat = (statToUpdate: keyof STATS, newStatValue: number) => {
        setStats({
            ...stats,
            [statToUpdate]: newStatValue
        });
    };

    const [errorText, setErrorText] = useState(null as null | string);

    const editCallback = useCallback(() => {
        setWriteMode(true);
    }, [setWriteMode]);

    const doneCallback = useCallback(() => {
        const newErrorText = statValidate(stats);
        if (newErrorText) {
            setErrorText(newErrorText);
            return;
        }
        setWriteMode(false);
    }, [stats, setErrorText, setWriteMode]);

    return (
        <StyledDiv>
            {errorText ? <div>{errorText}</div> : null}
            {orderedStatsList.map((stat, idx) => 
                <StatRow key={idx}
                    statName={stat}
                    statValue={stats[stat]}
                    statUpdateFunction={setSingleStat}
                    writeMode={inWriteMode}
                />
            )}
            {inWriteMode ? <button onClick={doneCallback}>Done</button> : <button onClick={editCallback}>Edit</button>}
        </StyledDiv>
    )
}

export default StatsBlock