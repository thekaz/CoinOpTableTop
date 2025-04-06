import React, {useState} from 'react';
import { STATS } from '../CONSTANTS';
import StatRow from './StatRow';
import styled from '@emotion/styled';

type StatsArray = Array<keyof STATS>;
const orderedStatsList: StatsArray = ['combat', 'coordination', 'constitution', 'cognition', 'commonSense', 'cooperation'];

const StyledDiv = styled.div`padding:12px;`

function StatsBlock() {
    const [inWriteMode, setEditMode] = useState(true);
    const default_stats: STATS = {
        combat: 0,
        coordination: 0,
        constitution: 0,
        cognition: 0,
        commonSense: 0,
        cooperation: 0,
    };
    const [stats, setStats] = useState(default_stats);

    const setSingleStat = (statToUpdate: keyof STATS, newStatValue: number) => {
        setStats({
            ...stats,
            [statToUpdate]: newStatValue
        });
    };

    return (
        <StyledDiv>
            {orderedStatsList.map((stat) => 
                <StatRow statName={stat} statValue={stats[stat]} statUpdateFunction={setSingleStat} writeMode={inWriteMode}/>
            )}
            <button onClick={() => setEditMode(!inWriteMode)}>{inWriteMode ? "Edit" : "Done"}</button>
        </StyledDiv>
    )
}

export default StatsBlock