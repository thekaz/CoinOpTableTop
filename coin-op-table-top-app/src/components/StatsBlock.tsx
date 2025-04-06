import React, {useState, useCallback, useMemo} from 'react';
import { STATS, AVAILABLE_POINTS } from '../CONSTANTS';
import StatRow from './StatRow';
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
    const defaultStats = useMemo( () => ({
        combat: 0,
        coordination: 0,
        constitution: 0,
        cognition: 0,
        commonSense: 0,
        cooperation: 0,
    } as STATS), []);
    const [stats, setStats] = useState(defaultStats);
    const [availablePoints, setAvailablePoints] = useState(AVAILABLE_POINTS);

    const increaseStat = useCallback((statToUpdate: keyof STATS) => {
        if (stats[statToUpdate] >=2) {
            return;
        }

        if (availablePoints <= 0) {
            return;
        }

        setStats({
            ...stats,
            [statToUpdate]: stats[statToUpdate] + 1
        });

        setAvailablePoints(availablePoints - 1);
        
    }, [stats, setStats, availablePoints, setAvailablePoints]);

    const decreaseStat = useCallback((statToUpdate: keyof STATS) => {
        if (stats[statToUpdate] <= -2) {
            return;
        }

        setStats({
            ...stats,
            [statToUpdate]: stats[statToUpdate] - 1
        });

        setAvailablePoints(availablePoints + 1);
        
    }, [stats, setStats, availablePoints, setAvailablePoints])

    const editCallback = useCallback(() => {
        setWriteMode(true);
    }, [setWriteMode]);

    const doneCallback = useCallback(() => {
        setWriteMode(false);
    }, [setWriteMode]);

    const resetCallback = useCallback(() => {
        setStats(defaultStats);
        setAvailablePoints(AVAILABLE_POINTS);
    }, [setStats, defaultStats, setAvailablePoints]);

    const listOfStats = Object.keys(stats) as Array<keyof STATS>;

    return (
        <StyledDiv>
            {listOfStats.map((stat, idx) => {
                return <StatRow key={idx}
                    statName={stat}
                    statValue={stats[stat]}
                    availablePoints={availablePoints}
                    increaseStatCallback={increaseStat}
                    decreaseStatCallback={decreaseStat}
                    writeMode={inWriteMode}
                />
                }
            )}
            {inWriteMode ?
                <div>
                    <div>
                        <label>Available points: {availablePoints}</label>
                        <button onClick={resetCallback}>Reset</button>
                    </div>
                    <button onClick={doneCallback}>Done</button>
                </div>
            : <div><button onClick={editCallback}>Edit</button></div>}
        </StyledDiv>
    )
}

export default StatsBlock